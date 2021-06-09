import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //所要获取的 分类页面 的索引
    parent_classify_id: -1,
    //分类名词数组 存储内容为：['米饭':模块数]
    keyList: []
  },

  async getChildClassifyList(){
    const res = await request({url:'/getclassify',index:this.data.parent_classify_id});
    const parent_classify_map = new Map();
    res.data.forEach(item => {
      if(!parent_classify_map.has(item.parent_classify_name)){
        parent_classify_map.set(item.parent_classify_name,[]);
      }
      parent_classify_map.get(item.parent_classify_name).push(item);
    })
    const keyList = new Array();
    parent_classify_map.forEach((value,key) => {
      keyList.push({[key]:Math.ceil(value.length/5)})
      wx.setStorageSync(key,value);
    })
    wx.setStorageSync('keyList',keyList);
    this.setData({
      keyList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const parent_classify_id = options.index;
    this.setData({
      parent_classify_id
    });
    this.getChildClassifyList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})