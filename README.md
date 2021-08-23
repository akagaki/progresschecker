# ProgressChecker
ボード形式のタスク管理アプリです。

## ■作成した目的
シンプルなCRUD機能アプリをSPAで作成する学習のため作成しました。

## ■デモ画面
メイン画面
<img src="https://user-images.githubusercontent.com/85749854/130179582-b47bca5b-544f-4e94-9471-4935df5a5d9d.png">
|チーム詳細画面|プロジェクト詳細画面|タスク詳細画面|
|---|---|---|
|<img src="https://user-images.githubusercontent.com/85749854/130179674-4edd46ad-8997-4241-9cba-ccf61836726d.png">|<img src="https://user-images.githubusercontent.com/85749854/130179757-4ca30bfc-53ed-41ea-a42c-6baf521c7e9e.png">|<img src="https://user-images.githubusercontent.com/85749854/130179804-56db77c7-62f4-449b-b66f-d28753cf82c4.png">|

## ■URL
http://progresschecker-akagaki.herokuapp.com/  
こちらのデモアカウントにてログイン下さい。  
Email：konan@com  
Pass：k0123456 

## ■使用技術
### ・フロントエンド
HTML/CSS  
Bootstrap 4.6.0  
JavaScript ES6  
React 17.0.2  
### ・バックエンド
PHP 8.08  
Laravel 8.40  
### ・データベース 
MySQL 5.7
### ・インフラ 
Docker  
Heroku
### ・その他使用ツール
Visual Studio Code  
Postman  
Sorcetree

## ■今後の課題
### 新規ユーザー登録時のバグの修正
現状ユーザー登録後にサーバーエラーが発生します。  
コードの問題も見つけられず、ローカル環境ではエラーは発生しないためHerokuの設定等に問題があると考え  
デプロイ先をAWS EC2に変更予定です。
### リマインド機能の追加
GoogleカレンダーやSlackとの連携を予定