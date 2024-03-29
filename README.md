# DAL in ENG

英語の勉強のために、デート・ア・ライブのスピンオフ「デート・ア・ライブ・アンコール」の巻頭部分の小説を英訳していました。その英訳結果をまとめるためのホームページです。NodeJSとVueJSで作成しています。

## Demo

https://github.com/EbinaKai/DALinENG/assets/85666313/81346993-a377-44a7-9246-6032b99be7bd


## Setup

NodeJSを使用するのでインストールしてください。

### 依存関係のインストール

必要パッケージのインストールしてください。
また、新規ユーザを追加する機能がまだないので手動で設定します。パスワードはハッシュとして保存するので、コマンドを実行して生成します。

```[bash]
npm install
node api/password_generator.js your_password
```

### テーブルの作成

データベースマネージメントシステムは `'MySQL'` を使ってください。ここでの `password_hash` は先程生成したものです。

```[bash]
mysql -u root -p 
> SOURCE dal_in_eng.sql 
> INSERT INTO users( name, password ) VALUES( 'your_username', 'password_hash' ) ;
```

### バックエンドサーバの設定

ログインや英訳結果をDBから持ってくるためのバックエンドサーバを起動します。`express` で作ってあります。  
データベースの環境変数を適切に設定してください。

```[bash]
echo 'SECRET_KEY="your_secret_key"' >> .env
echo 'DB_HOST="your_db_host"' >> .env
echo 'DB_USER="your_db_user"' >> .env
echo 'DB_PASS="your_db_passwd"' >> .env
echo 'DB_NAME="dal_in_eng"' >> .env
```

バックエンドサーバが起動しているホストとポート名をプロジェクトに知らせます。

```
echo "export const baseUrl = 'http://localhost:3001'" > src/config.js
```

### バックエンドサーバの起動

もし永続化させたい場合は `pm2`などのコマンドを使ってください。

```[bash]
node api_server.js
```

### プロジェクトの起動・ビルド

開発者モードで立ち上げると、コマンドラインで実行されます。  
ビルドすると`/dist`ディレクトリにソースコード群が作成されるので、各自Apacheのドキュメントルートなどに設置してください。

```[bash]
npm run dev     # 開発環境環境での起動
npm run build   # 本番環境用ソースコードをビルド
```


---

> © 橘公司・つなこ／KADOKAWA
> 当システムのコンテンツ内で使用している画像の著作権その他の知的財産権は、当該作品の提供元に帰属しています。  
> 当システムが掲載している画像等の無断使用・無断転載は固くお断りしております。
