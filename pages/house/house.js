// pages/house/house.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account_id: '',
    details: {},
    total_renqi: '',
    house_img: '',
    dengji:'',
    baifen:'',
    cat_one:'',
    cat_two:'',
    cat_three:'',
    cat_four:'',
    dog_one: '',
    dog_two: '',
    dog_three: '',
    dog_four: '',
    fish_one: '',
    fish_two: '',
    fish_three: '',
    fish_four: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;
    that.setData({
      account_id: options.account_id
    })
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
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/api.php/interfaces/index/my_house_api',
      data: {
        // uid: wx.getStorageSync('uid')
        account_id: wx.getStorageSync('account_id'),
        zhubo_id: that.data.account_id
      },
      success: res => {
        console.log(res)
        that.setData({
          details: res.data.data,
          total_renqi: res.data.data.total_renqi
        })
        // 房子变换
        var yideng = 30000;
        var erdeng = 60000;
        var sandeng = 120000;
        var sideng = 240000;
        if (res.data.data.total_renqi < yideng) {
          that.setData({
            house_img: '../../img/house/1.png'
          })
        } else if (res.data.data.total_renqi >= yideng && res.data.data.total_renqi < erdeng) {
          that.setData({
            house_img: '../../img/house/1.png'
          })
        } else if (res.data.data.total_renqi >= erdeng && res.data.data.total_renqi < sandeng) {
          that.setData({
            house_img: '../../img/house/1.png'
          })
        } else if (res.data.data.total_renqi >= sandeng && res.data.data.total_renqi < sideng) {
          that.setData({
            house_img: '../../img/house/1.png'
          })
        } else if (res.data.data.total_renqi >= sideng) {
          that.setData({
            house_img: '../../img/house/1.png'
          })
        }
        // 人气  等级和百分比
        var renqiyi = 6000;
        var renqier = 12000;
        var renqisan = 24000;
        var renqisi = 48000;
        if (res.data.data.total_renqi < 6000) {
          that.setData({
            dengji:1,
            baifen: (res.data.data.total_renqi - 0) / renqiyi * 100
          })
        } else if (res.data.data.total_renqi >= 6000 && res.data.data.total_renqi < 12000) {
          that.setData({
            dengji: 2,
            baifen: (res.data.data.total_renqi - 6000) / renqiyi * 100
          })
        } else if (res.data.data.total_renqi >= 12000 && res.data.data.total_renqi < 18000) {
          that.setData({
            dengji: 3,
            baifen: (res.data.data.total_renqi - 12000) / renqiyi * 100
          })
        } else if (res.data.data.total_renqi >= 18000 && res.data.data.total_renqi < 24000) {
          that.setData({
            dengji: 4,
            baifen: (res.data.data.total_renqi - 18000) / renqiyi * 100
          })
        } else if (res.data.data.total_renqi >= 24000 && res.data.data.total_renqi < 30000) {
          that.setData({
            dengji: 5,
            baifen: (res.data.data.total_renqi - 24000) / renqiyi * 100
          })
        } else if (res.data.data.total_renqi >= 30000 && res.data.data.total_renqi < 42000) {
          that.setData({
            dengji: 6,
            baifen: (res.data.data.total_renqi - 30000) / renqier * 100
          })
        } else if (res.data.data.total_renqi >= 42000 && res.data.data.total_renqi < 54000) {
          that.setData({
            dengji: 7,
            baifen: (res.data.data.total_renqi - 42000) / renqier * 100
          })
        } else if (res.data.data.total_renqi >= 54000 && res.data.data.total_renqi < 66000) {
          that.setData({
            dengji: 8,
            baifen: (res.data.data.total_renqi - 54000) / renqier * 100
          })
        } else if (res.data.data.total_renqi >= 66000 && res.data.data.total_renqi < 78000) {
          that.setData({
            dengji: 9,
            baifen: (res.data.data.total_renqi - 66000) / renqier * 100
          })
        } else if (res.data.data.total_renqi >= 78000 && res.data.data.total_renqi < 90000) {
          that.setData({
            dengji: 10,
            baifen: (res.data.data.total_renqi - 78000) / renqier * 100
          })
        } else if (res.data.data.total_renqi >= 90000 && res.data.data.total_renqi < 114000) {
          that.setData({
            dengji: 11,
            baifen: (res.data.data.total_renqi - 90000) / renqisan * 100
          })
        } else if (res.data.data.total_renqi >= 114000 && res.data.data.total_renqi < 138000) {
          that.setData({
            dengji: 12,
            baifen: (res.data.data.total_renqi - 114000) / renqisan * 100
          })
        } else if (res.data.data.total_renqi >= 138000 && res.data.data.total_renqi < 162000) {
          that.setData({
            dengji: 13,
            baifen: (res.data.data.total_renqi - 138000) / renqisan * 100
          })
        } else if (res.data.data.total_renqi >= 162000 && res.data.data.total_renqi < 186000) {
          that.setData({
            dengji: 14,
            baifen: (res.data.data.total_renqi - 162000) / renqisan * 100
          })
        } else if (res.data.data.total_renqi >= 186000 && res.data.data.total_renqi < 210000) {
          that.setData({
            dengji: 15,
            baifen: (res.data.data.total_renqi - 186000) / renqisan * 100
          })
        } else if (res.data.data.total_renqi >= 210000 && res.data.data.total_renqi < 258000) {
          that.setData({
            dengji: 16,
            baifen: (res.data.data.total_renqi - 210000) / renqisi * 100
          })
        } else if (res.data.data.total_renqi >= 258000 && res.data.data.total_renqi < 306000) {
          that.setData({
            dengji: 17,
            baifen: (res.data.data.total_renqi - 258000) / renqisi * 100
          })
        } else if (res.data.data.total_renqi >= 306000 && res.data.data.total_renqi < 354000) {
          that.setData({
            dengji: 18,
            baifen: (res.data.data.total_renqi - 306000) / renqisi * 100
          })
        } else if (res.data.data.total_renqi >= 354000 && res.data.data.total_renqi < 402000) {
          that.setData({
            dengji: 19,
            baifen: (res.data.data.total_renqi - 354000) / renqisi * 100
          })
        } else if (res.data.data.total_renqi >= 402000 && res.data.data.total_renqi < 450000) {
          that.setData({
            dengji: 20,
            baifen: (res.data.data.total_renqi - 402000) / renqisi * 100
          })
        } else if (res.data.data.total_renqi >= 450000) {
          that.setData({
            dengji: 20,
            baifen: 100
          })
        }
        // 猫狗鱼
        if (res.data.data.cat) {
          if (res.data.data.cat.category[0] == undefined) {
            that.setData({
              cat_one:''
            })
          } else {
            that.setData({
              cat_one: '../../img/cat/' + res.data.data.cat.category[0] + '.png'
            })
          }
          if (res.data.data.cat.category[1] == undefined) {
            that.setData({
              cat_two: ''
            })
          } else {
            that.setData({
              cat_two: '../../img/cat/' + res.data.data.cat.category[1] + '.png'
            })
          }
          if (res.data.data.cat.category[2] == undefined) {
            that.setData({
              cat_three: ''
            })
          } else {
            that.setData({
              cat_three: '../../img/cat/' + res.data.data.cat.category[2] + '.png'
            })
          }
          if (res.data.data.cat.category[3] == undefined) {
            that.setData({
              cat_four: ''
            })
          } else {
            that.setData({
              cat_four: '../../img/cat/' + res.data.data.cat.category[3] + '.png'
            })
          }
        }
        if (res.data.data.dog) {
          if (res.data.data.dog.category[0] == undefined) {
            that.setData({
              dog_one: ''
            })
          } else {
            that.setData({
              dog_one: '../../img/dog/' + res.data.data.dog.category[0] + '.png'
            })
          }
          if (res.data.data.dog.category[1] == undefined) {
            that.setData({
              dog_two: ''
            })
          } else {
            that.setData({
              dog_two: '../../img/dog/' + res.data.data.dog.category[1] + '.png'
            })
          }
          if (res.data.data.dog.category[2] == undefined) {
            that.setData({
              dog_three: ''
            })
          } else {
            that.setData({
              dog_three: '../../img/dog/' + res.data.data.dog.category[2] + '.png'
            })
          }
          if (res.data.data.dog.category[3] == undefined) {
            that.setData({
              dog_four: ''
            })
          } else {
            that.setData({
              dog_four: '../../img/dog/' + res.data.data.dog.category[3] + '.png'
            })
          }
        }
        if (res.data.data.fish) {
          if (res.data.data.fish.category[0] == undefined) {
            that.setData({
              fish_one: ''
            })
          } else {
            that.setData({
              fish_one: '../../img/fish/' + res.data.data.fish.category[0] + '.png'
            })
          }
          if (res.data.data.fish.category[1] == undefined) {
            that.setData({
              fish_two: ''
            })
          } else {
            that.setData({
              fish_two: '../../img/fish/' + res.data.data.fish.category[1] + '.png'
            })
          }
          if (res.data.data.fish.category[2] == undefined) {
            that.setData({
              fish_three: ''
            })
          } else {
            that.setData({
              fish_three: '../../img/fish/' + res.data.data.fish.category[2] + '.png'
            })
          }
          if (res.data.data.fish.category[3] == undefined) {
            that.setData({
              fish_four: ''
            })
          } else {
            that.setData({
              fish_four: '../../img/fish/' + res.data.data.fish.category[3] + '.png'
            })
          }
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