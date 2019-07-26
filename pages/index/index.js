//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navtab: ["最新", "最热"],
    currentTab: 0,
    current: 0,
    array: [],
    name: [],
    index: 0,
    id: '',
    current_page: 1,
    sum_page: 1,
    serch: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindPickerChange: function(e) {
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      current_page: 1
    })
    that.list_zhubo();

  },
  swichNav: function(e) {
    var that = this;
    console.log(e)
    that.setData({
      current: e.target.dataset.current,
      current_page: 1
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    that.list_zhubo();
  },
  serch: function(e) {
    var that = this;
    that.setData({
      serch: e.detail.value
    })
    that.list_zhubo();
  },
  zhubo_xiang: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/zhubo_xiang/zhubo_xiang?account_id=' + e.currentTarget.dataset.account_id
    })
  },
  list_zhubo: function() {
    var that = this;
    if (!that.data.index) {
      var fenlei = ''
    } else {
      var fenlei = that.data.id[that.data.index]
    }

    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/shouye',
      data: {
        // uid: wx.getStorageSync('uid')
        type: Number(that.data.current) + 1,
        category: fenlei,
        page: that.data.current_page,
        pagesize: 8,
        search: that.data.serch
      },
      success: res => {
        console.log(res)
        if (that.data.current_page == 1) {
          if (res.data.data.list) {
            that.setData({
              zhubo_list: res.data.data.list,
              sum_page: res.data.data.totalpage
            })
          }
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
  onShow: function() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/carousel_api',
      data: {
        // uid: wx.getStorageSync('uid')
      },
      success: res => {
        console.log(res)
        that.setData({
          imgUrls: res.data.data.carousel
        })
      }
    });
    // 主播列表
    that.list_zhubo();
    // 渠道
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/get_platform',
      data: {
        // uid: wx.getStorageSync('uid')
      },
      success: res => {
        console.log(res)
        that.setData({
          array: res.data.data.platform
        })
        // 内容
        var name = []
        for (var i = 0; i < that.data.array.length; i++) {
          name.push(that.data.array[i].platform_name)
        }
        that.setData({
          name: name
        })
        // id
        var id = []
        for (var i = 0; i < that.data.array.length; i++) {
          id.push(that.data.array[i].id)
        }
        that.setData({
          id: id
        })
        console.log(that.data.id)
      }
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    wx.stopPullDownRefresh();
    that.setData({
      zhubo_list: [],
      current_page: 1,
      sum_page: 1
    })
    that.list_zhubo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
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
      that.list_zhubo();
    } else if (current_page > that.data.sum_page) {
      wx.showToast({
        title: '数据已加载完',
        icon: 'loading',
        duration: 1000
      });
      return;
    }
  },
})