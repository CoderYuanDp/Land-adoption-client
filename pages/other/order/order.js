// pages/other/order/order.js
import { addOrder, formatTime } from '../../../utils/util';
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    landName: '',
    plant: '',
    price: 0,
    orderMsg: {},
    desc: '',
    vImg: {
      broccoli: {
        text: '西蓝花',
        src: 'https://dpweb.club:3000/1681653507892_Broccoli.png'},
      cabbage: {
        text: '白菜',
        src: 'https://dpweb.club:3000/1681653530996_cabbage.png'},
      celery: {
        text: '芹菜',
        src: 'https://dpweb.club:3000/1681653531079_celery.png'},
      eggplant: {
        text: '茄子',
        src: 'https://dpweb.club:3000/1681653531129_eggplant.png'},
      lotus: {
        text: '莲藕',
        src: 'https://dpweb.club:3000/1681653531173_lotus.png'},
      turnip: {
        text: '萝卜',
        src: 'https://dpweb.club:3000/1681653531209_turnip.png'}
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    console.log(e);
    this.setData({
      landName: e.landName,
      plant: e.plant,
      price: e.price,
      orderMsg: e
    })
  },
  confirm: function() {
    const userInfo = wx.getStorageSync('userInfo')
    const data = {
      order_timestamp: Date.now(),
      order_price: this.data.orderMsg.price,
      order_type: 0,
      order_desc: this.data.desc,
      user_id: userInfo.user_id,
      land_id: this.data.orderMsg.landId,
      farm_id: this.data.orderMsg.farmId,
      plant: this.data.orderMsg.plant
    }
    console.log(data);
    
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '提交订单中...'
    });
    addOrder(data).then(res => {
      if(res.success){
        Toast.clear()
            wx.showToast({
              title: '下单成功',
              icon: 'success',
              complete: () => {
                // 跳转
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/land/land',
                  })
                }, 1000);
                
              }
            })
        const date = formatTime(new Date())
        if(wx.getStorageSync('newsList')) {
          const newList = wx.getStorageSync('newsList')
          newList.push({date, msg: `您已成功领养${this.data.landName}`})
          wx.setStorageSync('newsList', newList)
        }else {
          wx.setStorageSync('newsList', [{date, msg: `您已成功领养${this.data.landName}`}])
        }
        return
      }
          wx.showToast({
            title: '下单失败',
            icon: 'error'
          })
    })
  },
  descInput: function(e) {
    this.setData({
      desc: e.detail.value
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