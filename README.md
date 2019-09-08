# MongoDBのテスト

バージョン  
Node: 10.9.x  
yarn: 1.10.x  

## パッケージのインストール

```
$ yarn install
```

## mongodbの起動

mongodbディレクトリに移動してから以下のコマンドを実行

```
$ cd mongodb
$ docker-compose up -d
```

[http://localhost:8081/](http://localhost:8081/)にGUIでデータの中身を確認できる。  

終了するときは同じディレクトリで`$ docker-compose down`を実行  

※-dでデーモン化するのが一般的な気がするが、ログの状況を常にみる場合は別ターミナルを開いて付けっ放しにしていた方がいいかも  

## サーバーの起動

```
$ yarn start
```

[http://localhost:8080/](http://localhost:8080/)にサーバーが立ち上がる。  
