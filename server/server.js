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

const TodoModel = require('./models/Todo');

// APIの設定
const router = express.Router();

router.route('/todos')
  .get((req, res) => {
    TodoModel
      .find()
      .sort({ createdAt: -1 })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .post((req, res) => {
    const { text } = req.body;

    const todo = new TodoModel();
    todo.text = text;
    todo.save((err) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.send('ok');
    })
  });

router.route('/todos/:todoId')
  .delete((req, res) => {
    const { todoId } = req.params;
    TodoModel
      .deleteOne({ _id: todoId })
      .then(() => {
        res.send('ok');
      });
  });

router.route('/todos/check/:todoId')
  .put((req, res) => {
    const { todoId } = req.params;
    const { isDone } = req.body;

    TodoModel
      .findOne({ _id: todoId })
      .then((todo) => {
        todo.isDone = isDone;
        todo.save()
          .then(() => {
            res.send('ok');
          });
      });
  });

app.use('/api', router);

// サーバーを起動する
const server = app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`START SERVER http://${host}:${port}`);
});
