// pages/my.js
import { getOrder } from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    myFarmList: [],
    Scount: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    if(!userInfo.user_avator) {
      userInfo.user_avator = 'https://dpweb.club:3000/1679136776577_title.jpg'
    }
    this.setData({
      userInfo: userInfo
    })
    const userId = userInfo.user_id
    getOrder({userId: userId, farmId: ''}).then(res => {
      console.log(res.list);
      let Scount = 0
      res.list.forEach(i => {
        if(i.status_mature){
          Scount ++
        }
      })
      this.setData({
        myFarmList: res.list,
        Scount
      })
    })
  },
  toMyLikes: function() {
    wx.navigateTo({
      url: '/pages/other/myLikes/myLikes',
    })
  },
  toMyOrders: function() {
    wx.navigateTo({
      url: '/pages/other/myOrders/myOrders',
    })
  },
  toMyAddress: function() {
    wx.navigateTo({
      url: '/pages/other/myAddress/myAddress',
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
    const userInfo = wx.getStorageSync('userInfo')
    const userId = userInfo.user_id
    getOrder({userId: userId, farmId: ''}).then(res => {
      console.log(res.list);
      let Scount = 0
      res.list.forEach(i => {
        if(i.status_mature){
          Scount ++
        }
      })
      this.setData({
        myFarmList: res.list,
        Scount
      })
    })
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