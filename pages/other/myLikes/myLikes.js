// pages/other/myLikes/myLikes.js
import {
  searchFarm
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    farmList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getLikeFarms()
  },
  getLikeFarms: function() {
    let likeArr
    if(wx.getStorageSync('likeArr')){
      likeArr = wx.getStorageSync('likeArr')
    }else {
      likeArr = []
      wx.setStorageSync('likeArr', [])
    }
    searchFarm({farmName: ''}).then(res => {
      const arr = res.list.filter(item => likeArr.includes(item.farm_id))
      this.setData({
        farmList: arr
      })
    })
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