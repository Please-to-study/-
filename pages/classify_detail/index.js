import {text_audio} from '../../apis/text_audio';
import {startRecord, stopRecord} from '../../apis/audio_identification';
import { getToken } from "../../apis/baidu_ai";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前页面标题tittle
    currentTittle: '',
    //当前页面标题编号
    currentTittleNum: 0,
    //当前页面实际学习单词数量
    contentListNum: 5,
    //默认一页学习的单词数量
    wordNum:5,
    //当前页面单词数组
    contentList: [],
    //语音识别结果
    recognize_result: '',
    //单词轮播图索引
    swiperIndex: 0
  },

  //文字转语音播放点击事件
  handleTextAudio(e){
    const {item} = e.target.dataset; 
    text_audio(item);
  },

  //录制录音按下按钮事件
  handleStartRecord(){
    startRecord();
  },

  //录制录音松开按钮事件
  async handleStopRecord(){
    let recognize_result = await stopRecord();
    recognize_result = recognize_result[0];
    recognize_result = recognize_result.substring(0,recognize_result.length-1);
    this.setData({
      recognize_result
    })
    
  },

  //学习单词内容轮播图 手动滑动时 触发的事件
  bindchange(e){
    this.setData({
      swiperIndex: e.detail.current
    })
  },


  //计算当前页面单词内容和数量
  getContentList(key,index){
    const startIndex = (index-1) * 5;
    const endIndex = startIndex + 5;
    const contentList = [];
    const temp = wx.getStorageSync(key).slice(startIndex,endIndex);
    temp.forEach(item =>{
      contentList.push(item.name);
    })
    return contentList;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {key,index} = options;
    const contentList = this.getContentList(key,+index);
    const contentListNum = contentList.length;
    this.setData({
      currentTittle: key,
      currentTittleNum: index,
      contentList,
      contentListNum
    })
    getToken();
  }
})