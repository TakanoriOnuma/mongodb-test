const express = require('express');
const router = express.Router();

// models
const TodoModel = require('../../models/Todo');

router.route('/')
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

router.route('/:todoId')
  .delete((req, res) => {
    const { todoId } = req.params;
    TodoModel
      .deleteOne({ _id: todoId })
      .then(() => {
        res.send('ok');
      });
  });

router.route('/check/:todoId')
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

module.exports = router;
