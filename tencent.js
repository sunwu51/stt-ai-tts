const tencentcloud = require("tencentcloud-sdk-nodejs");
const fs = require('fs');
const moment = require('moment-timezone');
const { randomUUID } = require("crypto");

const AsrClient = tencentcloud.asr.v20190614.Client
const TTSClient = tencentcloud.tts.v20190823.Client

const clientConfig = {
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: 'ap-shanghai',
  profile: {
    signMethod: "TC3-HMAC-SHA256", 
    httpProfile: {
      reqMethod: "POST", 
      reqTimeout: 180, 
    },
  },
}

const asrClient = new AsrClient(clientConfig)

const ttsClient = new TTSClient(clientConfig)

async function stt(fileBase64) {
    const req = {
        EngineModelType: "16k_zh",
        ChannelNum: 1,
        ResTextFormat: 3,
        SourceType: 1,
        // FilterPunc: 1,
        Data: fileBase64
    }
    const createRes = await asrClient.CreateRecTask(req);
    console.log(`创建stt task ${createRes.Data.TaskId}成功，等待处理完成`);

    return new Promise(function(resolve, reject) {
        const handle = setInterval(async () => {
            const statusRes = await asrClient.DescribeTaskStatus({
                TaskId: createRes.Data.TaskId,
            });
            console.log(`task ${createRes.Data.TaskId} 状态:${statusRes.Data.StatusStr}`);
            if (statusRes.Data.Status === 2) {
                clearInterval(handle);
                resolve(statusRes.Data.Result)
            }
            if (statusRes.Data.Status === 3) {
                clearInterval(handle);
                console.error("stt任务失败");
                reject(new Error("任务失败"));
            }
        }, 1000);
    })
}

async function tts(text) {
  const req = {
    Text: text,
    SessionId: randomUUID()
  }
  return (await ttsClient.TextToVoice(req)).Audio;
}

module.exports = {stt, tts}