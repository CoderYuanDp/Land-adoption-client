// pages/other/farmlist/farmlist.js
import {
  searchFarm
} from '../../../utils/util'
const bmap = require("../../../libs/bmap-wx.min.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: "yrpr3EIZANCNyp9750iZSXGw4BHpGOMX",
    longitude: '--', //经度
    latitude: '--', //纬度
    address: '--', //地址
    cityInfo: {},
    farmList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    const BMap = new bmap.BMapWX({
      ak: _this.data.ak
    })
    BMap.regeocoding({
      fail: (err) => {
        console.log('error', err);
      },
      success: (data) => {
        console.log(data.wxMarkerData[0]);
        data = data.wxMarkerData[0]
        _this.setData({
          longitude: data.longitude,
          latitude: data.latitude,
          address: data.address
        })
        _this.getFarmList(data.longitude, data.latitude)
      }
    })
  },
  getFarmList(lng, lat) {
    searchFarm({
      farmName: ''
    }).then(res => {
      res.list = res.list.map(farm => {
        farm.farm_lan_lng = farm.farm_lan_lng.split(',').map(Number)
        return farm
      })
      console.log(res.list);
      const list = res.list.filter(farm => {
        farm.distance = this.getDistance(lat, lng, farm.farm_lan_lng[1], farm.farm_lan_lng[0])
        if(farm.distance < 100) {
          return true
        }
        return false
      })
      console.log(list);
      this.setData({
        farmList: list
      })
    })
  },
  // 计算距离函数
  Rad(d) { 
    //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(1) //保留两位小数
    console.log('经纬度计算的距离:' + s)
    return s
  },
  toFarmDetail(e){
    console.log(e.currentTarget.dataset.farm_id);
    wx.navigateTo({
      url: '/pages/other/farmdetail/farmdetail?farm_id='+e.currentTarget.dataset.farm_id,
    }).catch()
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