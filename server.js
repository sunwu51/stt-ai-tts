const dotenv = require('dotenv');
dotenv.config()// 加载当前目录下的.env文件作为环境变量

const express = require('express');
const conversationRouter = require('./conversation.js');
const chat =  require('./chat.js');

const app = express();
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/conversation', conversationRouter.router); 
app.use('/chat', chat.router); 

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});