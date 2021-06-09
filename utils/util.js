/*
    promise 形式 getUserProfile
*/
export const getUserProfile =({title})=>{
  return new Promise((resolve, reject)=>{
      wx.getUserProfile({
          desc:title,
          success: (result) => {
              resolve(result);
          },
          fail: (err) => {
              reject(err);
          }
      });
        
  })
}

/*
    promise 形式 login()
*/
export const login =()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'http://www.pkubailu.cn:3000/onLogin',
            method:'POST',
            data: {
              code: res.code
            },
            success (res) {
              //console.log(res.data)
              getApp().globalData.token=res.data.token;
              console.log("login()---token:"+getApp().globalData.token)
              resolve()
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })
}

