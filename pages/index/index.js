// index.js
var hotapp = require('../../utils/hotapp.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base: 0,
    list: [],
    hasMore: -1,
    isRefresh:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHttpData() 
  },

  getHttpData: function () {
    console.log("base = "+this.data.base)
    var that = this;
    that.setData({
      hasMore: 1,
      isRefresh : true
    })
    hotapp.request({
      useProxy: true,
      url: app.baseurl.servsers +"/lists/?base="+ that.data.base,
      success: function (res) {
        console.log(res.data)

        if (res.data.msg == "OK"){

          if (that.data.base == 0) {
            that.setData({
              list: res.data.data
            })
            wx.stopPullDownRefresh()
          } else {
            var list = that.data.list
            for (var i = 0; i < res.data.data.length; i++) {
              list.push(res.data.data[i])
            }
            that.setData({
              list: list
            })
          }

          that.data.base = that.data.list[that.data.list.length - 1].cid
          that.setData({
            hasMore: -1,
            isRefresh: false
          })
        }else{
          that.setData({
            hasMore: 0,
            isRefresh: false
          })
        }
        
        
        
        
      },
      fail: function (error) {
        console.log("服务器异常")
      },
      complete:function () {

      }
    })
  },
  listenerClick:function(e){
    var cid = e.currentTarget.dataset.id
    console.log(cid)
    wx.navigateTo({
      url: '../playAnim/playAnim?cid='+cid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉刷新")
    this.data.base = 0
    this.getHttpData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉加载更多" + this.data.base)
    if (this.data.isRefresh == false){
      this.getHttpData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})