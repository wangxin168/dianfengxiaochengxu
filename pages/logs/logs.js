
// pages/wode/wode.js
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
    navtab: ["周榜", "日榜", "月榜","神豪榜"],
    currentTab: 0,
    current:0,
    zhubo_list:[],
    sum_page:1,
    current_page:1,
    shenhaobang:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  swichNav: function (e) {
    var that = this;
    that.setData({
      current: e.target.dataset.current,
      current_page: 1
    })
    if (that.data.current==3){
      that.shenhao();
    }else{
      that.list_bang();
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
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
  list_bang: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/bang_top',
      data: {
        type: Number(that.data.current) + 1,
        page: that.data.current_page,
        pagesize: 12
      },
      success: res => {
        console.log(res)
        if (that.data.current_page == 1) {
          that.setData({
            zhubo_list: res.data.data.list,
            sum_page: res.data.data.totalpage
          })
        } else {
          var new_page_cont = that.data.zhubo_list;
          var current_guide_list = res.data.data.list;
          for (var i = 0; i < current_guide_list.length; i++) {
            new_page_cont.push(current_guide_list[i])
          }
          that.setData({
            zhubo_list: new_page_cont
          })
        }
      }
    });
  },
  shenhao: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/shen_top',
      data: {
        type: Number(that.data.current) + 1,
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
      url: getApp().globalData.url + '/api.php/interfaces/index/bang_carousel_api',
      data: {
        // uid: wx.getStorageSync('uid')
      },
      success: res => {
        // console.log(res)
        that.setData({
          imgUrls: res.data.data.carousel
        })
      }
    });
    that.list_bang();
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
      zhubo_list: [],
      current_page: 1,
      sum_page: 1
    })
    that.list_bang();
    that.shenhao();
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
      if (that.data.current == 3) {
        that.shenhao();
      } else {
        that.list_bang();
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