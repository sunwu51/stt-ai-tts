const express  = require('express');
const { activeConversations }  = require('./conversation.js');
const router = express.Router();
const tencent = require('./tencent.js');

(async function init() {
    const { ChatGPTAPI }  = await import('chatgpt');
    let api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY || "put your open ai token to .env file" ,
        apiBaseUrl: process.env.OPENAI_API_URL
    });
    console.log("chatgpt init finished");

    router.post('/stt', async (req, res) => {
        const {audio} = req.body;
        const text = await tencent.stt(audio);
        res.json({text});
    })


    router.post('/tts', async (req, res) => {
        const {text} = req.body;
        const audio = await tencent.tts(text);
        res.json({audio});
    })

    router.post('/message', async (req, res) => {
        const {msg, cid} = req.body;
        const index = activeConversations.findIndex(it => it.cid === cid);
        if (index < 0) {
            res.statusCode = 404;
            res.json({message: "conversation not exist"});
            return;
        }
        const conversation = activeConversations[index];
        // send a message and wait for the response
        let r = await api.sendMessage(msg, {
            parentMessageId: conversation.parentMessageId
        });
        conversation.parentMessageId = r.id;
        const responseMsg = r.text;
        res.json({"msg": responseMsg});
    })
})();

module.exports = {router};