from datetime import datetime, time
from django.core.checks import messages
from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from requests.api import request
from requests.sessions import session 
from ratingapp.models import Image, User, Rating
from django.db.models import Avg
from django.utils import timezone
from django.http import JsonResponse, response
from ipware import get_client_ip
from . import twitter
import pandas as pd
import plotly.graph_objects as go
import json
import re
import uuid


def top(request):
    # ハッシュ値生成
    initial_token = str(uuid.uuid4())
    # セッションにトークンを格納
    request.session['initial_token'] = initial_token
    # メッセージ取得
    msg = request.GET.get('msg')
    if msg == 200:
        msg = '投稿しました Success!'
    else:
        msg = None
    return render(request, 'top.html', {
        'initial_token': initial_token,
        'message': msg,
        })

def get_from_rating(your_img):
    avg = Rating.objects.filter(image__media_url=your_img).aggregate(
        Avg('cd'), Avg('sa'), Avg('cmp'), Avg('hue'), 
        Avg('edit'), Avg('nar'),
    )
    avg = list(avg.values())
    return avg

def modify_tweet_link(request):
    # URL取得
    url = request.GET.get('url')
    # URL validation
    if not url.startswith('https://twitter.com/'):
        d = { 'url': "false" }
        return JsonResponse(d)
    try: # modidy URL
        url = ''.join(re.findall(r'https://twitter.com/.+/status/\d+', url))
    except:
        d = { 'url': "false" }
        return JsonResponse(d)
    # tweetIDを抽出
    findtw = re.findall(r'status/(\d+)', url)
    tweet_id = ''.join(findtw)
    # TwitterAPI -> JSONリクエスト
    tw = twitter.LookupTweet(tweet_id)
    tw_url = tw.create_url()
    json_response = tw.connect_to_endpoint(tw_url)
    list_media = json_response.get("includes").get("media")
    list_media_length = len(list_media)
    img = [] # media_urlのリスト
    for l in list_media:
        if l.get("type") == "photo":
            img.append(l.get("url")) # imgリストに格納
        else:
            d = { 'url': "false" }
            return JsonResponse(d)
    # 画像複数のときラジオボタン生成
    img_html = []
    for i, l in zip(img, range(list_media_length)):
        img_html.append(f'<input type="radio" name="select" value="{i}" id="select-image{l}"><label for="select-image{l}"></label><style>input[type=radio][value="{i}"]+label:before{{background-image:url({i});}}</style>')

    # user情報取得
    user = json_response.get("includes").get("users")
    for u in user:
        author_id = u.get('id')
        name = u.get('name')
        username = u.get('username')

    d = {
        'url': url,
        'img': img,
        'img_html': img_html,
        'list_media_length': list_media_length,
        'author_id': author_id,
        'name': name,
        'username': username,
    }
    
    # 画像単数なら確定して集計データ取得
    if list_media_length == 1:
        your_img = img[0]
        d['your_img'] = your_img
        try: # 既存データあり
            Image.objects.get(media_url=your_img)
            avg = get_from_rating(your_img) # 集計クエリ
            d['avg'] = avg
        except: # 既存データなし
            d['avg'] = [0,0,0,0,0,0]
        return JsonResponse(d)
    else:
        return JsonResponse(d)

def selected(request):
    d = {}
    your_img = request.GET.get('img')    
    try: # 既存データあり
        Image.objects.get(media_url=your_img)
        avg = get_from_rating(your_img) # 集計クエリ
        d['avg'] = avg
    except: # 既存データなし -> 平均値0
        d['avg'] = [0,0,0,0,0,0]
    return JsonResponse(d)

def post_to_rating(request):
    # クライアントIPを取得
    client_addr, is_routable = get_client_ip(request)
    if client_addr is not None:
        # We got the client's IP address
        if not is_routable:
            # The client's IP address is private
            client_addr = None
    # 送信されたトークンを取得
    token_in_request = request.GET.get('initial_token') 
    # 一度使用したトークンだった場合セッションから破棄
    s = request.session.get('initial_token')
    print(f'session token: {s}')
    token_in_session = request.session.pop('initial_token', '')
    if not token_in_request == token_in_session:
        print(f'session mismatch: {token_in_request}//{token_in_session}')
        d = {'m': '更新してください Please reload!'}
        return JsonResponse(d)
    url = request.GET.get('url')
    your_img = request.GET.get('your_img')
    author = request.GET.get('author_id')
    name = request.GET.get('name')
    username = request.GET.get('username')
    cd = request.GET.get('cd')
    sa = request.GET.get('sa')
    cmp = request.GET.get('cmp')
    hue = request.GET.get('hue')
    edit = request.GET.get('edit')
    nar = request.GET.get('nar')
    # save to DB
    try: 
        # ユーザー
        obj, created = User.objects.update_or_create(
            author_id=author,
            username=username,
            defaults={'updated_at': timezone.now},
        )
        print(f'user created?: {created}')
        # 画像
        obj_img, created_img = Image.objects.update_or_create(
            user__author_id=author,
            url=url,
            media_url=your_img,
            defaults={
                'user': obj,
                'updated_at': timezone.now,
                },
        )
        print(f'image created?: {created_img}')
        # 評価
        obj_rt, created_rt = Rating.objects.get_or_create(
            client=client_addr,
            user=obj, 
            image=obj_img,
            defaults={
                'cd':cd, 'sa':sa, 'cmp':cmp, 'hue':hue, 'edit':edit, 'nar':nar,
                'created_at':timezone.now,
                'session':token_in_request,
            },
        )
        print(f'{obj_rt.user} rating created?: {created_rt}')
        # 連投の場合
        if not created_rt: 
            d = {'m': '複数投稿はできません You cannot post more than once.'}
            return JsonResponse(d)
    except Exception as e:
        print(f'saving fail: {e}')
        d = {'m': '更新してください Please reload!'}
        return JsonResponse(d)

    # 同一セッション内登記をクリア
    try:
        ses = Rating.objects.filter(pk__in=list(Rating.objects.filter(session=token_in_request).order_by('-created_at')[1:].values_list('pk', flat=True)))
        print(f'duplicating: {[s.image.media_url for s in ses]}')
        ses.delete()
    except Exception as e:
        print(f'deleting fail: {e}')
        
    # 保存完了でリロード
    d = {'m': 0}
    return JsonResponse(d)


class AboutView(TemplateView):
    template_name = 'about.html'

def recently(request):
    # 評価数0のimageレコードを削除
    allimg = Image.objects.all()
    for a in allimg:
        count = Rating.objects.filter(image=a).count()
        if count == 0:
            print(f'invalid image: {a}')
            a.delete()
    # 直近で評価された画像を(n-1)件表示
    n = 11
    recents = Image.objects.order_by('-updated_at')
    recent_imgs = []
    for r in recents:
        recent_imgs.append(r.media_url)
    
    graphs = [] # チャート生成
    avgs = [] # 平均値
    categories = ['キャラデザ','デッサン力','構図',
                '色彩', '演出', '物語性']
    # 取得画像ごとにチャート生成
    for i in recent_imgs: 
        avg = get_from_rating(i) # 集計クエリ
        fig = go.Figure()
        fig.update_layout(
            paper_bgcolor='#14171A',
            plot_bgcolor='#14171A',
            polar=dict(
                radialaxis=dict(
                    visible=True,
                    range=[0, 5]
                )),
            showlegend=False,
            template="plotly_dark",
        )
        fig.add_trace(go.Scatterpolar(
            r=avg,
            theta=categories,
            fill='toself',
            name='みんなの評価'
        ))
        plot_fig_avg = fig.to_html(fig, include_plotlyjs=False)
        # リストに追加
        graphs.append(plot_fig_avg)
        avgs.append(avg)
    # 格納
    z = zip(recents[:n], graphs[:n], avgs[:n])
    return render(request, 'recently.html', {
        'z': z,
    })