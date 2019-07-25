// pages/autr/autr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yao_code:'',
    name_name:'',
    index: 0,
    array:[],
    chushi_sex:0,
    pingtai:[],
    ping_id:[],
    ping_che:'',
    tempFilePaths:[],
    tempFile: [],
    // 物品图片
    upload_img: [],
    now_upload_img:[],
    poster_src:[],
    jieshao:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  yaoq:function(e){
    var that=this;
    that.setData({
      yao_code:e.detail.value
    })
  },
  name: function (e) {
    var that = this;
    that.setData({
      name_name: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    var that=this;
    this.setData({
      index: e.detail.value,
      chushi_sex: 1,
      // 选择平台后的id
      ping_che: that.data.ping_id[e.detail.value]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //图片上传
  up_img: function () {
    var that = this;
    that.setData({
      upload_img:[]
    })
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        that.upload(res.tempFilePaths, successUp, failUp, i, length);
      }
    })
  },
  upload: function (filePaths, successUp, failUp, i, length) {
    var that = this;
    wx.uploadFile({
      url: getApp().globalData.url + '/api.php/interfaces/index/upload_img',
      filePath: filePaths[i],
      name: 'image',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res);
        
        var res_data = JSON.parse(res.data);
        console.log(res_data)
        if (res_data.code == 1) {
          successUp++;
          var arrimg = that.data.poster_src;
          var now_upload_img = that.data.upload_img
          arrimg.push(filePaths[i]);
          now_upload_img.push(res_data.data.img_thumb);
          that.setData({
            poster_src: arrimg,
            upload_img: now_upload_img
          })
          console.log(that.data.upload_img)
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
        }
        else {  //递归调用uploadDIY函数
          that.upload(filePaths, successUp, failUp, i, length);
          that.setData({
            chuan: 0
          })
        }
      }
    })
  },
  jieshao:function(e){
    var that=this;
    that.setData({
      jieshao:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/get_platform',
      success: res => {
        console.log(res)
        that.setData({
          pingtai: res.data.data.platform
        })
        var ping = res.data.data.platform
        var pingarr=[];
        var pingindex=[];
        for (var i = 0; i < ping.length;i++){
          pingarr.push(ping[i].platform_name)
          pingindex.push(ping[i].id)
        }
        that.setData({
          array: pingarr,
          ping_id: pingindex
        })
      }
      
    });
    
  },
  savebtn:function(){
    var that = this;
    var a = that.data.upload_img
    console.log(a)
    var b = a.join(',')
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/my_authente',
      data:{
        account_id: wx.getStorageSync('account_id'),
        invite_code: that.data.yao_code,
        username:that.data.name_name,
        platform_id: that.data.ping_che,
        images:b,
        words: that.data.jieshao
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code==1){
          wx.navigateBack({
            delta: 1,
          })
        }
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