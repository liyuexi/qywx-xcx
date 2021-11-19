// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World cc',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    environment: "环境未知",
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  version(){
    wx.qy.getSystemInfo({
      success (res) {
        console.log("version"+res.version)
      }
    })

  },
  qyuse(){
    console.log("Rwx.qy.getNFCReaderState:"+wx.qy.canIUse('getNFCReaderState'));
    // console.log("Rwx.qy.shareToTrainee:"+wx.canIUse('wx.qy.shareToTrainee'));
  },
  check(){
    let _this = this
    wx.getSystemInfo({
      success (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        console.log(res.environment)
        if(res.environment &&  res.environment=="wxwork"){
          _this.setData({
            environment: "当前为企业微信环境"
          })
          _this.version();
          _this.qyuse();
          _this.login();
        }else{
          _this.setData({
            environment: "当前为微信环境"
          })
        }
      }
    })
  },

  login(){
    wx.qy.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          console.log("code:"+res.code);
          wx.request({
            url: 'http://tobdev.ant-xy.com:9900/xcx/login',
            data: {
              corp_id:"wwae6d661c97e24e98",
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  test(){
    let _this = this
    wx.request({
      url: 'http://tobdev.ant-xy.com:9900/test', //仅为示例，并非真实的接口地址
      success (res) {
        wx.showToast({
          title: res.data.data.data,
        })
        _this.setData({
          motto: res.data.data.data,
        })
        console.log(res.data)
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
