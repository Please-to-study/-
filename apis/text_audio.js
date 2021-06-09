//调用微信文字转语音插件
const plugin = requirePlugin('WechatSI');
//文字转语音后的语音文件路径地址
var text_audio_path = '';

//文字转语音函数
export function text_audio(text){
  plugin.textToSpeech({
    lang: "zh_CN",//代表中文
    tts: true, //是否对翻译结果进行语音合成，默认为false，不进行语音合成
    content: text,//要转为语音的文字
    success: function (res) {
      text_audio_path = res.filename//将文字转为语音后的路径地址
      text_audio_status();//调用此方法来监听语音播放情况
    },
    fail: function (err) {
      console.log("文字转语音失败", err)
    }
  })
}

//用来监听文字转语音的播放情况
export function text_audio_status(){
  //判断语音路径是否存在
  if (text_audio_path == '') {
     return;
   }
  const innerAudioContext = wx.createInnerAudioContext();//创建音频实例
  innerAudioContext.src = text_audio_path; //设置音频地址
  innerAudioContext.play(); //播放音频
  innerAudioContext.onPlay(() => {
  });
  innerAudioContext.onEnded(() => {
    innerAudioContext.stop();
    //播放停止，销毁该实例,不然会出现多个语音重复执行的情况
    innerAudioContext.destroy();
  })
  innerAudioContext.onError(() => {
    innerAudioContext.destroy()//销毁播放实例
  })
}