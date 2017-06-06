// playAnim.js
var hotapp = require('../../utils/hotapp.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: '',
    videoUrl:'',
    poster:'',
    title:'',
    name:'',
    explain:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.data.cid = options.cid
    console.log(that.data.cid)
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
    })
    hotapp.request({
      useProxy: true,
      url: app.baseurl.servsers +"/url/"+ that.data.cid,
      success: function (res) {
        console.log(res.data)
        var urls = res.data.data.urls
        var url = urls[urls.length-1].url
        that.setData({
          videoUrl: url,
          poster: res.data.data.icon,
          title: res.data.data.name,
          name: res.data.data.name,
          explain: res.data.data.explain
        })
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      },
      fail: function (error) {
        console.log("服务器异常")
      },
      complete:function () {

      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})