'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// 本番じゃないときはローカルのDBに接続する
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../mongodb/.env') });

  const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
  mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    user: MONGODB_USERNAME,
    pass: MONGODB_PASSWORD,
    dbName: 'todo',
    auth: {
      authdb: 'admin',
    }
  })
    .catch((err) => {
      console.error(err);
    });
} else {
  // 本番では環境変数に入っているURIにアクセスする
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
    .catch((err) => {
      console.error(err);
    });
}

// expressインスタンスの生成
const app = express();

// POST送信などのbodyデータをJSONで取得できるようにする
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// public以下に配置したファイルは直リンクで見れるようにする
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/api', require('./apis'));

// サーバーを起動する
const server = app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`START SERVER http://${host}:${port}`);
});
