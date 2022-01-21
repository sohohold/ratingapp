import requests
import os
import json
from django.conf import settings

bearer_token = settings.BEARER_TOKEN
if bearer_token is None:
    print('ENV load fail!')

class LookupTweet:
    def __init__(self, tweetid):
        self.id = tweetid
    # クエリURL作成
    def create_url(self):
        ids = "ids=" + str(self.id) # ID
        expansions = "expansions=attachments.media_keys,author_id"
        media_fields = "media.fields=url"
        url = "https://api.twitter.com/2/tweets?{}&{}&{}".format(ids, expansions, media_fields,)
        return url

    # GETしてJSON取得する関数
    def connect_to_endpoint(self, url):
            # 認証用関数
        def bearer_oauth(r):
            r.headers["Authorization"] = f"Bearer {bearer_token}"
            r.headers["User-Agent"] = "v2TweetLookupPython"
            return r
        try:
            response = requests.request("GET", url, auth=bearer_oauth)
            return response.json()
        except Exception as e:
            print(f'response fail: {e}')