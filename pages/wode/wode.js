// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    status: '',
    no_login: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  purse: function() {
    wx.navigateTo({
      url: '/pages/purse/purse',
    })
  },
  ziliao: function() {
    // if (wx.getStorageSync('openid') == "") {
    if (!wx.getStorageSync('isphone')) {
      if (!wx.getStorageSync('user_nickname')) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }else{
        wx.navigateTo({
          url: '/pages/denglu/denglu'
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/ziliao/ziliao',
      })
    }

  },
  autr: function() {
    var that = this;
    if (that.data.status) {
      if (that.data.status == 0) {
        wx.navigateTo({
          url: '/pages/autring/autring',
        })
      } else if (that.data.status == 1) {
        wx.navigateTo({
          url: '/pages/reautr/reautr',
        })
      } else if (that.data.status == 2) {
        wx.navigateTo({
          url: '/pages/autr/autr',
        })
      }
    }else{
      wx.showToast({
        title: '登录后可认证',
        icon:'none'
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
    // if (!wx.getStorageSync('isphone')){
    //   wx.navigateTo({
    //     url: '/pages/denglu/denglu',
    //   })
    // }
    var that = this;
    that.setData({
      no_login: wx.getStorageSync('isphone')
    })
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/my_userinfo',
      data: {
        account_id: wx.getStorageSync('account_id')
      },
      success: res => {
        // console.log(res)
        if(res.data.code==1){
          that.setData({
            userinfo: res.data.data.userinfo,
            status: res.data.data.userinfo.status
          })
        }

      }
    });
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