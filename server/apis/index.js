const express = require('express');
const router = express.Router();

// サーバーの動作確認
router.get('/health', (req, res) => {
  res.send('I am OK!');
});

// routes
router.use('/todos', require('./router/todos'));

module.exports = router;
