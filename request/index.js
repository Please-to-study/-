
export const request=(params)=>{
    // wx.showLoading({
    //     title: "加载中",
    //     mask: true,
    // });
      
    //定义公共url部分
    const baseUrl = "https://www.pkubailu.cn";
    return new Promise((resolve, reject)=>{
        wx.request({
            ...params,
            url:baseUrl + params.url,
            data: {
                index: params.index
            },
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                //关闭 加载中 效果
                //wx.hideLoading();
            }
        }); 
    })
}