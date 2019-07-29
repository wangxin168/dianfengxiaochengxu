// pages/ziliao/ziliao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    nick_name:'',
    tempFilePaths:[],
    tempFile:[],
    wx_codeimg:[],
    wxwx_code:[],
    img_act:'',
    img_avatar:'',
    array:['请选择性别','男','女'],
    index: 0,
    chushi_sex:0,
    date: '1990-01-01',
    chushi_date:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.removeStorageSync('nickname')
  },
  rev_nick:function(){
    wx.navigateTo({
      url: '/pages/revnick/revnick',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      chushi_sex:1
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      chushi_date: 1
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
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/my_userinfo',
      data: {
        account_id: wx.getStorageSync('account_id')
      },
      success: res => {
        // console.log(res)
        that.setData({
          userinfo: res.data.data.userinfo,
          img_avatar: res.data.data.userinfo.avatar
        })
        console.log(that.data.img_avatar)
        if (wx.getStorageSync('nickname')!=''){
          that.setData({
            nick_name: wx.getStorageSync('nickname')
          })
        }else{
          that.setData({
            nick_name: res.data.data.userinfo.nickname
          })
        }
      }
    });
  },
  //微信图片上传
  wx_img: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // console.log(res)
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFile: res.tempFilePaths,
          img_act: res.tempFilePaths[0]
        })
        console.log(that.data.img_act)
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        that.uploading(res.tempFilePaths, successUp, failUp, i, length);
      }
    })
  },
  uploading: function (filePaths, successUp, failUp, i, length) {
    
    var that = this;
    // console.log(filePaths[i])
    wx.uploadFile({
      url: getApp().globalData.url + '/api.php/interfaces/index/upload_img',
      filePath: filePaths[i],
      name: 'image',
      success: function (res) {
        var res_data = JSON.parse(res.data);
        // console.log(res_data)
        if (res_data.code == 1) {
          successUp++;
          var arrimg = that.data.wxwx_code;
          var now_upload_img = that.data.wx_codeimg
          arrimg.push(filePaths[i]);
          now_upload_img.push(res_data.data.img_thumb);
          that.setData({
            wxwx_code: arrimg,
            wx_codeimg: now_upload_img
          })
          
        } else {
          wx.showToast({
            // title: res_data.error,
            title: '上传错误',
            icon: 'loading'
          })
        }
      },
      fail: function (e) {
        failUp++;
        wx.showToast({
          title: '请求失败',
          icon: 'loading'
        })
      },
      complete: function () {
        i++;
        if (i == length) {
          wx.showToast({
            title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            icon: 'loading'
          })
          that.setData({
            chuan: 1
          })
        } else { //递归调用uploadDIY函数
          that.upload(filePaths, successUp, failUp, i, length);
          that.setData({
            chuan: 0
          })
        }
      }
    })
  },
  savebtn:function(){
    var that = this;
    if (that.data.wx_codeimg[0] == undefined) {
      that.data.wx_codeimg[0]=''
    }
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/save_userinfo',
      data: {
        account_id: wx.getStorageSync('account_id'),
        avatar: that.data.wx_codeimg[0],
        nickname: that.data.nick_name,
        sex: that.data.index,
        birthday:that.data.date
      },
      success: res => {
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
      }
    });
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