// pages/zhubo_xiang/zhubo_xiang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navtab: ["主播介绍", "留言","贡献榜"],
    currentTab: 0,
    account_id:'',
    details:'',
    liuyan_list:[],
    sum_page: 1,
    current_page: 1,
    shenhaobang:[],
    current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    that.setData({
      account_id: options.account_id
    })
  },
  swichNav: function (e) {
    var that = this;
    that.setData({
      current: e.target.dataset.current
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (that.data.current==2){
      that.gongxian();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  dianji_img:function(e){
    var src = e.currentTarget.dataset.src;//获取data-src
    wx.previewImage({
      current: src, // 当前显示图片的http链接,
      urls: [src]
    })
  },
  liuyan:function(){
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/message_lst',
      data: {
        account_id: that.data.account_id,
        page: that.data.current_page,
        pagesize: 12
      },
      success: res => {
        console.log(res)
        if (that.data.current_page == 1) {
          that.setData({
            liuyan_list: res.data.data.message_lst,
            sum_page: res.data.data.totalpage
          })
        } else {
          var new_page_cont = that.data.message_lst;
          var current_guide_list = res.data.data.list;
          for (var i = 0; i < current_guide_list.length; i++) {
            new_page_cont.push(current_guide_list[i])
          }
          that.setData({
            liuyan_list: new_page_cont
          })
        }
      }
    });
  },
  gongxian: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/s_gift_detail',
      data: {
        zhubo_id: that.data.account_id,
        page: that.data.current_page,
        pagesize: 12
      },
      success: res => {
        console.log(res)
        if (that.data.current_page == 1) {
          that.setData({
            shenhaobang: res.data.data.list,
            sum_page: res.data.data.totalpage
          })
        } else {
          var new_page_cont = that.data.shenhaobang;
          var current_guide_list = res.data.data.list;
          for (var i = 0; i < current_guide_list.length; i++) {
            new_page_cont.push(current_guide_list[i])
          }
          that.setData({
            shenhaobang: new_page_cont
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/zhubo_detail',
      data: {
        // uid: wx.getStorageSync('uid')
        account_id: that.data.account_id
      },
      success: res => {
        console.log(res)
        that.setData({
          imgUrls: res.data.data.zhubo.lunbo,
          details: res.data.data.zhubo
        })
      }
    });
    that.liuyan();
    that.gongxian();
  },
  house:function(e){
    // console.log(e)
    if (!wx.getStorageSync('isphone')) {
      if (!wx.getStorageSync('user_nickname')) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      } else {
        wx.navigateTo({
          url: '/pages/denglu/denglu'
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/house/house?account_id=' + e.currentTarget.dataset.account_id
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
    var that = this;
    wx.stopPullDownRefresh();
    that.setData({
      liuyan_list: [],
      current_page: 1,
      sum_page: 1
    })
    that.liuyan();
    that.gongxian();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    var that = this;
    var current_page = null;
    current_page = that.data.current_page + 1;
    that.setData({
      current_page: current_page
    })
    if (current_page <= that.data.sum_page) {
      wx.showToast({
        title: '加载中！',
        icon: 'loading',
        duration: 1000
      })
      
      if (that.data.current == 2) {
        that.gongxian();
      } else {
        that.liuyan();
      }
    } else if (current_page > that.data.sum_page) {
      wx.showToast({
        title: '数据已加载完',
        icon: 'loading',
        duration: 1000
      });
      return;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})