# 智能语音助手
这是个套壳的演示项目，主要是集成了语音转文字，AI Chat还有文字转语音三种API。

![image](https://i.imgur.com/jcz3LzJ.gif)
# 使用方式
## 1 添加配置。
在根目录添加`.env`配置文件
```env
OPENAI_API_KEY=<下面有获取方式>
OPENAI_API_URL=https://api.chatanywhere.com.cn
TENCENT_SECRET_ID=<腾讯云获取的SECRET_ID>
TENCENT_SECRET_KEY=<腾讯云获取的SECRET_KEY>
```
## 2 启动
```
$ npm i
$ node server.js
```
可以将本服务部署在本地或者其他云服务上。

# 语音转文字 与 文字转语音
这部分有很多API可以使用，本项目使用的是腾讯云提供的语音转文字服务[参考文档](https://cloud.tencent.com/document/product/1093/54362)和文字转语音服务[参考文档](https://cloud.tencent.com/document/product/1073/56640)，虽然可能不是效果最好的，但是是最便宜的，因为只需要注册腾讯云账号即可获取免费的额度。

对于语音转文字每月10个小时的额度完全够用，而对于文字转语音，是一共800w字符的额度，可以用3个月，超过费用是每1w个字才2毛钱非常便宜。

在登陆腾讯云之后，访问[API密钥管理页面](https://console.cloud.tencent.com/cam/capi)创建自己的`secretId`和`secretKey`，后面会用到。

# Chat API
最火的ai聊天莫过于chatGPT了，但是在国内chatGPT账号被大量封杀，所以需要通过代理来完成。使用`https://api.chatanywhere.cn/v1/oauth/free/github/render`提供生成的token，然后在gptapi调用的时候将url改为`https://api.chatanywhere.com.cn`，即可免费使用gpt3.5接口了。

