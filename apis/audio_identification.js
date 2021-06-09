// 引入语音识别api模块
import { soundReco } from "./baidu_ai"
//创建录音管理实例
const recorder = wx.getRecorderManager();
//录音文件临时路径
var audio_path = '';
//从临时文件路径中读取的录音数据
var audio_data = '';




//语音识别再一次封装的调用函数
async function soundRecognize(){
  //等待获取百度语音识别结果
  const recognize_result = await soundReco(audio_data);
  return recognize_result;
}

  //开始录音函数
export function startRecord(){
  const options = {
    sampleRate: 16000,
    numberOfChannels: 1,
    format: "PCM"
  };
  recorder.start(options);
  recorder.onStart(()=>{
  });
  recorder.onError(err=>{
  });
}

//停止录音函数
export function stopRecord(){
  var recognize_result = '';
  return new Promise((resolve,reject) =>{
    //录音停止
    recorder.stop();
    //监听录音停止
    recorder.onStop(res=>{
      //将录音文件临时地址赋值给全局变量
      audio_path = res.tempFilePath;
      //创建微信读取文件实例
      const fs = wx.getFileSystemManager();
      fs.readFile({
        filePath: audio_path,
        success: (res)=>{
          audio_data = res.data;
          recognize_result = soundRecognize();
          resolve(recognize_result);
        }
      });
    });
  })
}