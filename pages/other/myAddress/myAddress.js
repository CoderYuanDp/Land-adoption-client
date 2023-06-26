// pages/other/myAddress/myAddress.js
import { areaList } from '@vant/area-data';
import { editAddress } from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    areaList,
    selectAddress: '',
    userInfo: {}
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo);
    this.setData({
      userInfo
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  areaConfirm(e) {
    const address = e.detail.values.map(ads => {
      return ads.name
    }).join(',')
    console.log(address);
    this.setData({
      show: false,
      selectAddress: address
    })
  },
  areaCancel() {
    console.log("取消了");
    this.setData({
      show: false,
      selectAddress: ''
    })
  },
  getAddress(e) {
    this.setData({
      show: false,
      selectAddress: e.detail.value
    })
  },
  openPop() {
    this.setData({
      show: true,
    })
  },
  addAddress() {
    if(!this.data.selectAddress) {
      wx.showToast({
        title: '地址不能为空',
        icon: "none",
      });
      return
    }
    
    editAddress({userId: this.data.userInfo.user_id, address: this.data.selectAddress}).then(res => {
      if(res.success) {
        wx.showToast({
          title: '添加地址成功',
          icon: "none",
        });
        const userInfo = JSON.parse(JSON.stringify(this.data.userInfo))
        userInfo.user_address = this.data.selectAddress
        console.log('1111',userInfo);
        this.setData({
          userInfo,
          selectAddress: ''
        })
        wx.setStorageSync('userInfo', userInfo)
        return
      }
      wx.showToast({
        title: '添加地址失败',
        icon: "none",
      });
    })
  },
  toTest() {
    wx.navigateTo({
      url: '/pages/other/ar/ar',
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