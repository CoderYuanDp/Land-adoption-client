// pages/other/farmernews/farmernews.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    userInfo: null,
    msgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.connectSocket({
      url: 'wss://dpweb.club:3000/link'
    });
    
    // 监听WebSocket连接成功事件
    wx.onSocketOpen((res) => {
      console.log('WebSocket连接已打开！');
    });
    const userInfo = wx.getStorageSync('userInfo')
    if(!userInfo.user_avator) {
      userInfo.user_avator = 'https://dpweb.club:3000/1679136776577_title.jpg'
    }
    this.setData({
      userInfo
    })
    let localMsgList
    if(wx.getStorageSync('localMsgList')){
      localMsgList = wx.getStorageSync('localMsgList')
    }else {
      wx.setStorageSync('localMsgList', [])
      localMsgList = []
    }
    this.setData({
      msgList: localMsgList
    })
    // 监听WebSocket消息事件
    wx.onSocketMessage((res) => {
      const data = JSON.parse(res.data)
      if(data.from == userInfo.user_id || data.from == 'server'  || data.to == userInfo.user_id){
        const list = this.data.msgList
        list.push(data)
        wx.setStorageSync('localMsgList', list)
        this.setData({
          msgList: list
        })
      }
    });
  },
  msgInput: function(e) {
    this.setData({ msg: e.detail.value })
  },
  sendMsg: function() {
    // 发送WebSocket消息
    wx.sendSocketMessage({data: JSON.stringify({
      userInfo: this.data.userInfo,
      content: this.data.msg,
      from: this.data.userInfo.user_id,
      to: 'admin'
    })});
    this.setData({ msg: '' })
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
    wx.closeSocket()
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