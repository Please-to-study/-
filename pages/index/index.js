//0 引入 用来发送请求的方法 一定要把路径补充完整
import { request } from "../../request/index.js"

Page({
  data: {
    timer: null,
    //轮播图数组
    swiperlist:[],
    //导航栏数组
    cateslist:[],
    //热点新闻数组
    hotNewsList:[]
  },
  onLoad() {
    //获取轮播图数据
    this.getSwiperList();
    //获取导航栏数据
    this.getCatesList();
    //获取热点新闻数据
    this.getHotList();
  },

  //获取轮播图数据函数
  async getSwiperList(){
    const res = await request({url:'/swiper'});
    this.setData({
      swiperlist:res.data
    })
  },

  //获取导航栏数据函数
  async getCatesList(){
    const res = await request({url:'/classify'});
    this.setData({
      cateslist:res.data
    })
  },
    //获取热点新闻数据函数
  async getHotList(){
    const res = await request({url:'/hotNews'});
    this.setData({
      hotNewsList: res.data
    })
  }
})
