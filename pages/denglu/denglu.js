// pages/denglu/denglu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iphone:'',
    pass:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  iphone: function (e) {
    this.setData({
      iphone: e.detail.value
    });
  },
  pass: function (e) {
    this.setData({
      pass: e.detail.value
    });
  },
  denglu:function(){
    var that=this;
    console.log(that.data.iphone)
    console.log(that.data.pass)
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/login_api',
      data: {
        mobile: that.data.iphone,
        pwd: that.data.pass
      },
      success: res => {
        // console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if (res.data.code == 1) {
          wx.setStorageSync('isphone', that.data.iphone)
          wx.setStorageSync('account_id', res.data.data.account_id)
          wx.navigateBack({
            delta: 1
          })
        }
      }
    });
  },
  zhuce:function(){
    wx.navigateTo({
      url: '/pages/zhuce/zhuce',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('isphone')) {
      wx.navigateBack({
        delta: 1
      })
    }
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