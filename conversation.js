const { randomUUID } = require('crypto');
const moment  = require('moment');
const express  = require('express');

const router = express.Router();
const activeConversations = [];

// 获取所有会话
router.get('/', (req, res) => {
    res.json({activeConversations})
});
  
// 创建会话，并返回会话id，如果超过10个active则创建失败。
router.post('/create', (req, res) => {
  if (activeConversations.length > 10) {
    res.statusCode = 400;
    res.json({"message": "there are more than 10 active conversations"});
    return;
  }
  const cid = randomUUID();

  const conversation = {
    cid,
    createTime: moment(),
    parentMessageId: undefined,
  }
  
  activeConversations.push(conversation);
  res.json({cid});
});

// 删除会话
router.post('/delete', (req, res) => {
  console.log(req.body)
  const cid = req.body.cid;
  const index = activeConversations.indexOf(activeConversations.find(it => it.cid != cid));
  activeConversations.splice(index, 1);
  res.json({activeConversations})
});

module.exports = { router, activeConversations}