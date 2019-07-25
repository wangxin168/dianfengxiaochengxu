// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.login({
      success: res => {
        wx.request({
          url: getApp().globalData.url + "/api.php/interfaces/api/get_openid_api",
          data: {
            code: getApp().globalData.code,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res)
            if (res.data.code == 1) {
              wx.setStorageSync('openid', res.data.data.openid2)
            }
            // if (res.data.data.img != undefined) {
            wx.navigateTo({
              url: '/pages/index/index',
            })
            // }
          }
        })
      }
    })
  },
  //获取用户信息接口

  bindGetUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.setStorageSync('user_img', e.detail.userInfo.avatarUrl)
      wx.setStorageSync('user_nickname', e.detail.userInfo.nickName)
      wx.request({
        url: getApp().globalData.url + "/api.php/interfaces/api/save_xcx_userinfo",
        data: {
          openid: wx.getStorageSync('openid'),
          nickname: e.detail.userInfo.nickName,
          avatar: e.detail.userInfo.avatarUrl
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == 1) {
            wx.redirectTo({
              url: '/pages/denglu/denglu',
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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