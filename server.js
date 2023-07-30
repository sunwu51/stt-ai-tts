const dotenv = require('dotenv');
dotenv.config()// 加载当前目录下的.env文件作为环境变量

const express = require('express');
const conversationRouter = require('./conversation.js');
const chat =  require('./chat.js');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/conversation', conversationRouter.router); 
app.use('/chat', chat.router); 
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  // 错误处理逻辑
  res.status(500).json({err});
}

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});