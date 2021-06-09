import {getUserProfile,login} from "../../utils/util.js";

Page({
  data: {
    userInfo:{}
  },
  onShow(){
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({userInfo});
  },
  async handleGetUserProfile(){
    const {userInfo} = await getUserProfile({title:'获取用户信息'});
    wx.setStorageSync('userInfo', userInfo);
    this.onShow();
    if(getApp().globalData.token == null){
      login();
    }
  }
})

