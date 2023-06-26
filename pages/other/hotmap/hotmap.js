// pages/other/hotmap/hotmap.js
import {
  searchFarm
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    farmList: [],
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFarmList()
  },
  getFarmList() {
    searchFarm({
      farmName: ''
    }).then(res => {
      res.list = res.list.map(farm => {
        farm.farm_lan_lng = farm.farm_lan_lng.split(',').map(Number)
        return farm
      })
      const markers = res.list.map(farm => {
        return {
          id: farm.farm_id,
          iconPath: 'https://dpweb.club:3000/1681378120332_farm_icon.png',
          latitude: farm.farm_lan_lng[1],
          longitude: farm.farm_lan_lng[0],
          width: 20,
          height: 20
        }
      })
      this.setData({
        farmList: res.list,
        markers
      })
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