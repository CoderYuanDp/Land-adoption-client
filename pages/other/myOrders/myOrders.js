// pages/other/myOrders/myOrders.js
import { getOrder, formatTime } from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myFarmList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userId = wx.getStorageSync('userInfo').user_id
    getOrder({userId: userId, farmId: ''}).then(res => {
      console.log(res.list);
      res.list = res.list.map(item => {
        item.order_timestamp = formatTime(new Date(item.order_timestamp))
        return item
      })
      this.setData({
        myFarmList: res.list
      })
    })
  },
  toOrderDetail: function(e) {
    console.log(e.currentTarget.dataset.orderid);
    wx.navigateTo({
      url: `/pages/other/orderDetail/orderDetail?orderId=${e.currentTarget.dataset.orderid}&farmName=${e.currentTarget.dataset.farmname}&landName=${e.currentTarget.dataset.landname}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})