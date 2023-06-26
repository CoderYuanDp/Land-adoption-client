// pages/other/orderDetail/orderDetail.js
import { getOrderDetail } from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},
    farmName: '',
    landName: '',
    status_germinate: "",
    status_grow: "",
    status_mature: "",
    status_sproute: "",
    show: false,
    imgDraw: {}, //绘制图片的大对象
    sharePath: '' //生成的分享图
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    const { orderId, farmName, landName } = e
    this.setData({
      farmName,
      landName
    })
    getOrderDetail({orderId}).then(res => {
      if(res.success) {
        this.setData({
          orderDetail: res.list[0],
          status_germinate: res.list[0].status_germinate,
          status_grow: res.list[0].status_grow,
          status_mature: res.list[0].status_mature,
          status_sproute: res.list[0].status_sproute
        })
      }
    })
  },
  showPop: function() {
    this.drawPic()
  },
  onClose: function() {
    this.setData({
      show: false
    })
  },
  onImgOK: function() {
    console.log('ok');
  },
  drawPic() {
    wx.showLoading({
      title: '生成中'
    })
    this.setData({
      imgDraw: {
        width: '750rpx',
        height: '1334rpx',
        background: 'https://dpweb.club:3000/1682774282709_f_l.png',
        views: [
          {
            type: 'image',
            url: 'https://dpweb.club:3000/1682774860899_c3.png',
            css: {
              top: '32rpx',
              left: '30rpx',
              right: '32rpx',
              width: '688rpx',
              height: '420rpx',
              borderRadius: '16rpx',
              boxShadow: '0px 4rpx 8px 0px rgba(0, 0, 0, 1)'
            },
          },
          {
            type: 'image',
            url: wx.getStorageSync('userInfo').user_avator || 'https://dpweb.club:3000/1679136776577_title.jpg',
            css: {
              top: '404rpx',
              left: '328rpx',
              width: '96rpx',
              height: '96rpx',
              borderWidth: '6rpx',
              borderColor: '#FFF',
              borderRadius: '96rpx'
            }
          },
          {
            type: 'text',
            text: wx.getStorageSync('userInfo').user_nickname || '匿名',
            css: {
              top: '532rpx',
              fontSize: '28rpx',
              left: '375rpx',
              align: 'center',
              color: '#fff'
            }
          },
          {
            type: 'text',
            text: `邀请您体验我的ar土地`,
            css: {
              top: '644rpx',
              left: '375rpx',
              maxLines: 1,
              align: 'center',
              fontWeight: 'bold',
              fontSize: '44rpx',
              color: '#fff'
            }
          }
        ]
      }
    })
  },
  onImgOK(e) {
    wx.hideLoading()
    this.setData({
      show: true,
      sharePath: e.detail.path
    })
  },
  handlePhotoSaved() {
    this.savePhoto(this.data.sharePath)
  },
  // 保存图片
  savePhoto(path) {
    wx.showLoading({
      title: '正在保存...',
      mask: true
    })
    this.setData({
      isDrawImage: false
    })
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: (res) => {
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
        setTimeout(() => {
          this.setData({
            show: false
          })
        }, 300)
      },
      fail: (res) => {
        wx.getSetting({
          success: res => {
            let authSetting = res.authSetting
            if (!authSetting['scope.writePhotosAlbum']) {
              this.setData({
                isModal: true
              })
            }
          }
        })
        setTimeout(() => {
          wx.hideLoading()
          this.setData({
            show: false
          })
        }, 300)
      }
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
    let glb = ''
    if(this.data.status_sproute) {
      glb = 'sproute'
    }
    if(this.data.status_germinate){
      glb = 'germinate'
    }
    if(this.data.status_grow){
      glb = 'grow'
    }
    if(this.data.status_mature){
      glb = 'mature'
    }
    console.log('glb',glb);
    return {
      title: '分享',
      path: '/pages/other/ar/ar?glb=' + glb,
      imageUrl: this.data.sharePath,
      success: function (res) {
     // 转发成功
          wx.showToast({
            title: "分享成功",
            icon: 'success',
            duration: 2000
          })
       },
      fail: function (res) {
        // 分享失败
      },
    }
  }
})