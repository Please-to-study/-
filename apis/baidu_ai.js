
const ACCESS_KEY = "5vap2e5agzC66DfMz0B2IWaY";
const ACCESS_SECRET = "bWRDBQzuwjQSaCnadDM26xlXnUFEmLWi";
//获取百度api的 token函数
export function getToken(){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${ACCESS_KEY}&client_secret=${ACCESS_SECRET}`,
      method: "POST",
      success: (res)=>{
        // console.log(res);
        wx.setStorage({
          data: res.data.refresh_token,
          key: "user-token",
        })
      }
    });
  });
}

//百度语音识别函数
export function soundReco(data){
  let token = wx.getStorageSync("user-token");
  if(!token){
    getToken();
  }
  return new Promise((resolve, regest)=>{
    wx.request({
      url: `https://vop.baidu.com/pro_api?dev_pid=80001&cuid=155236miniapp&token=${token}`,
      method: "POST",
      data: data,
      header: {"Content-Type": "audio/pcm;rate=16000"},
      success: (res)=>{
        resolve(res.data.result);
      },
      fail: (err)=>{
        reject(err);
      }
    })
  });
}
