// index.js
// 获取应用实例
const app = getApp()
import { uploadFile, login, getLunbo } from '../../utils/util.js'
Page({
    data: {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 5000,
      background: [],
      popShow: false,
      fileList: [],
      nickname: '',
      phone: '',
    },
    toSearch() {
      wx.navigateTo({
        url: '/pages/other/search/search',
        fail: (res) => {
          console.log(res)
        }
      })
    },
    toHotFarm() {
      wx.navigateTo({
        url: '/pages/other/hotfarm/hotfarm',
        fail: (res) => {
          console.log(res)
        }
      })
    },
    toHotMap() {
      wx.navigateTo({
        url: '/pages/other/hotmap/hotmap',
        fail: (res) => {
          console.log(res)
        }
      })
    },
    toReginFarm() {
      wx.navigateTo({
        url: '/pages/other/farmlist/farmlist',
        fail: (res) => {
          console.log(res)
        }
      })
    },
    toKnc() {
      wx.navigateTo({
        url: '/pages/other/knc/knc',
      })
    },
    toSxy() {
      wx.navigateTo({
        url: '/pages/other/sxy/sxy',
      })
    },
    toSxgo() {
      wx.navigateTo({
        url: '/pages/other/sxgo/sxgo',
      })
    },
    toYqping() {
      wx.navigateTo({
        url: '/pages/other/yqping/yqping',
      })
    },
    onLoad() {
      this.getLunboList()
      if (!wx.getStorageSync('userInfo')) {
        this.setData({
          popShow: true
        })
      }
    },
    // 获取轮播图
    getLunboList() {
      getLunbo().then(res => {
        console.log('轮播图',res.list)
        this.setData({
          background: res.list
        })
      })
    },
    // 登录
    async onClose() {
      if(this.data.nickname == '' || this.data.phone == ''){
        return
      }
      const loginData = {
        nickname: this.data.nickname,
        phone: this.data.phone,
        avator: ''
      }
      if(this.data.fileList.length !== 0){
        const data = await uploadFile(this.data.fileList[0].url)
        loginData.avator = data.files[0].url
        login(loginData).then(res => {
          wx.setStorageSync('userInfo', res.data)
          this.setData({
            popShow: false
          })
        })
      }else {
        login(loginData).then(res => {
          wx.setStorageSync('userInfo', res.data)
          setTimeout(() => {
            this.setData({
              popShow: false
            })
          }, 300);
          
        })
      }
      
    },
    afterRead(event) {
      const {
        file
      } = event.detail;
      console.log(file);
      const {
        fileList = []
      } = this.data
      fileList.push({
        url: file.url,
        name: 'avator'
      })
      this.setData({
        fileList
      })
    },
    deleteImg(event) {
      const index = event.detail.index
      const {
        fileList
      } = this.data
      fileList.splice(index, 1)
      this.setData({
        fileList
      })
    },
    getNickname(e) {
      this.setData({
        nickname: e.detail.value
      })
    },
    getPhone(e) {
      this.setData({
        phone: e.detail.value
      })
    },
    toFarmDetail(e){
      console.log(e.currentTarget.dataset.farm_id);
      wx.navigateTo({
        url: '/pages/other/farmdetail/farmdetail?farm_id='+e.currentTarget.dataset.farm_id,
      }).catch()
    },
  })
  