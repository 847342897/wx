//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //测试点击事件
  clickMe(){
    this.setData({ motto: '行不行啊，小老弟' })
    var parameter = {};
    parameter['openid'] = "test";
    parameter = JSON.stringify(parameter);
    //测试交互(ajax GET POST 方式)
    wx.request({
      url: 'https://www.bihubao.com/index.php/AgentCustomerServer/Obtain/get_card_info', //仅为示例，并非真实的接口地址
      data: {
        parameter
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"  //post
        // 'content-type': 'application/json'
      },
      complete: function (res) {
        if (res == null || res.data == null) {
          reject(new Error('网络请求失败'))
        }
      },
      success: function (res) {
         console.log(res.data);
      }
    })
  },

  //如何替换值，循环数据之类


})
