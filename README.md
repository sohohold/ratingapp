# ratingapp
## 概要
Twitterにアップされたイラストを項目別に６段階で評価して、集計データをレーダーチャート化するサイトです。  
諸項目は以下の6つです。  

1. キャラクターデザイン  
1. デッサン力  
1. 構図・構成  
1. 色彩・色の配置  
1. 演出・フォトジェニック  
1. 世界観・物語性  

## 使い方
①あらかじめTwitter上で**ツイートのリンク**をコピーしてください。  
ブラウザのアドレスバーからか、もしくはツイート本文右下にある上矢印アイコンから「ツイートのリンクをコピー」を選択することでコピーできます。  
**画像アドレス（`pbs.twimg.com`から始まるURL）は無効**です。  
②本サイトの検索ボックスにコピーしたリンクを貼り付けて、しばらく待つか検索ボタンを選択してください。  
評価したいツイートに2つ以上の画像メディアが含まれている場合は画像を１つに限定します。選択画面が表示されたら評価する画像を選択してOKボタンをクリックします。  
③評価は０～５の６段階で行います。  
数値と評価は比例していますので、良いと思えば高い数値を入力してください。  
なお初期値は5に設定されているため注意してください。  
項目にカーソルを合わせるとその項目についての解説が見ることができます。  
全項目に数値を入力したあとOKボタンを選択すればデータが送信されます。  

## 想定されたユーザー
イラストについて、Likeボタン・Retweetボタン以外の手段によって分析的に評価を下したいユーザーを対象にしています。  
今後の展開によっては、クリエイター自身がその評価を参照できる環境ができるかもしれません。  

## ユーザーが持つ課題
Twitterで日々投稿されるイラストを漫然と目を通すだけではなく、より詳細に評価したい。  
あるいは、イラストについて蓄積された諸評価を総合的なデータとして表示する統一化された場が欲しいという課題を仮定しています。  

## 課題の解決方法（このサービスでどうやって解決するか）
当サービスは、LikeあるいはRetweetといった手短で簡略なリアクションの共有ではなく、  
より詳細で分析的な評価をリアクションとしてユーザーが登録・蓄積・アベレージ化し、ユーザーに共有すること。  
これにより、イラストを見る側は大雑把な基準に頼ることなく、反省的にイラストを評価できると考えています。  
一方クリエイター側にとっては、集計された評価データが提供されることで、そのイラストの長所と短所を  
細分化された評価基準から把握し、今後の創作活動にフィードバックするための材料として活用できる展開も想定しえます。  
