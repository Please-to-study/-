import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //文章id号
    id: "",
    //文章标题
    title: "",
    //文章内容
    content: ""
  },

  async getHotNewsContent(id){
    const res = await request({url:'/hotNewsContent',index:id});
    this.setData({
      content: res.data.content
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id,title} = options;
    this.getHotNewsContent(id);
    this.setData({
      id,
      title
    })
  }
})