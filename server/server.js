'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// 本番じゃないときはローカルのDBに接続する
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../mongodb/.env') });
}

// expressインスタンスの生成
const app = express();

// POST送信などのbodyデータをJSONで取得できるようにする
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// public以下に配置したファイルは直リンクで見れるようにする
app.use(express.static(path.resolve(__dirname, './public')));

// サーバーの動作確認
app.get('/health', (req, res) => {
  res.send('I am OK!');
});

// サーバーを起動する
const server = app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`START SERVER http://${host}:${port}`);
});
