// pages/zhuce/zhuce.js
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iphone: '',
    code: '',
    pass1: '',
    pass2: '',
    time: '获取验证码', //倒计时 
    currentTime: 61
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getCode: function(options) {
    var that = this;
    var currentTime = that.data.currentTime
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/get_code_api',
      data: {
        mobile: that.data.iphone
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if(res.data.code==1){
          interval = setInterval(function () {
            currentTime--;
            that.setData({
              time: currentTime + '秒'
            })
          }, 1000)
        }
      }
    });
    if (currentTime <= 0) {
      clearInterval(interval)
      that.setData({
        time: '重新发送',
        currentTime: 61,
        disabled: false
      })
    }
    
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  iphone: function(e) {
    this.setData({
      iphone: e.detail.value
    });
  },
  code: function(e) {
    this.setData({
      code: e.detail.value
    });
  },
  pass1: function(e) {
    this.setData({
      pass1: e.detail.value
    });
  },
  pass2: function(e) {
    this.setData({
      pass2: e.detail.value
    });
  },
  zhuce: function() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/register_api',
      data: {
        mobile: that.data.iphone,
        pwd1: that.data.pass1,
        pwd2: that.data.pass2,
        code: that.data.code,
        xcx_openid: wx.getStorageSync('openid'),
        xcx_nickname: wx.getStorageSync('user_nickname'),
        xcx_avatar: wx.getStorageSync('user_img')
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if(res.data.code==1){
          wx.setStorageSync('isphone', that.data.iphone)
          wx.setStorageSync('account_id', res.data.data.account_id)
          wx.navigateBack({
            delta: 1
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})