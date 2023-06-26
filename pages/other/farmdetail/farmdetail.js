// pages/other/farmdetail/farmdetail.js
import {
  getLand
} from '../../../utils/util'
const bmap = require("../../../libs/bmap-wx.min.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: "yrpr3EIZANCNyp9750iZSXGw4BHpGOMX",
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 5000,
    background: [],
    landList: [],
    farmId: '',
    canAdopt: 0,
    mainPlants: '',
    isLike: true,
    vImg: {
      broccoli: {
        text: '西蓝花',
        src: 'https://dpweb.club:3000/1681653507892_Broccoli.png'
      },
      cabbage: {
        text: '白菜',
        src: 'https://dpweb.club:3000/1681653530996_cabbage.png'
      },
      celery: {
        text: '芹菜',
        src: 'https://dpweb.club:3000/1681653531079_celery.png'
      },
      eggplant: {
        text: '茄子',
        src: 'https://dpweb.club:3000/1681653531129_eggplant.png'
      },
      lotus: {
        text: '莲藕',
        src: 'https://dpweb.club:3000/1681653531173_lotus.png'
      },
      turnip: {
        text: '萝卜',
        src: 'https://dpweb.club:3000/1681653531209_turnip.png'
      }
    },
    longitude: '',
    latitude: '',
    address: '',
    distance: 0,
    plants: [],
    selectedLandId: '',
    selectedPlant: '',
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
  onLoad: function (e) {
    console.log(e.farm_id);
    this.setData({
      farmId: e.farm_id
    })
    if (!wx.getStorageSync('likeArr')) {
      wx.setStorageSync('likeArr', [])
    } else {
      const likeArr = wx.getStorageSync('likeArr')
      if (likeArr.includes(e.farm_id)) {
        this.setData({
          isLike: false
        })
      }
    }
    getLand({
      farmId: e.farm_id
    }).then(res => {
      let canAdopt = 0
      res.list = res.list.map(l => {
        l.land_plants = JSON.parse(l.land_plants)
        l.farm_lan_lng = l.farm_lan_lng.split(',').map(Number)
        if(!l.is_adopted) {
          canAdopt++
        }
        return l
      })
      wx.setNavigationBarTitle({
        title: res.list[0].farm_name
      })
      // mainPlants
      const mainPlants = res.list[0]?.land_plants.map(p => {
        return this.data.vImg[p].text
      }).join(',')
      this.setData({
        landList: res.list,
        canAdopt,
        mainPlants
      })
      const _this = this
      const BMap = new bmap.BMapWX({
        ak: _this.data.ak
      })
      BMap.regeocoding({
        fail: (err) => {
          console.log('error', err);
        },
        success: (data) => {
          data = data.wxMarkerData[0]
          _this.setData({
            longitude: data.longitude,
            latitude: data.latitude,
            address: data.address
          })
          const distance = _this.getDistance(data.latitude, data.longitude, _this.data.landList[0]?.farm_lan_lng[1], _this.data.landList[0]?.farm_lan_lng[0])
          _this.setData({
            distance
          })
        }
      })
    })

  },
  addLike: function () {
    let likeArr = wx.getStorageSync('likeArr') || []
    if (this.data.isLike) {
      likeArr.push(this.data.farmId)
      wx.setStorageSync('likeArr', likeArr)
      this.setData({
        isLike: false
      })
    } else {
      likeArr = likeArr.filter(item => item !== this.data.farmId)
      wx.setStorageSync('likeArr', likeArr)
      this.setData({
        isLike: true
      })
    }

  },
  share: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
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
  selectLand: function(e) {
    if(e.currentTarget.dataset.landadopted === 1) {
      wx.showToast({
        title: '该块土地已被认养，请选择其他地块',
        icon: "none",
      });
      return
    }
    let id = ''
    if(e.currentTarget.dataset.landid !== this.data.selectedLandId) {
      id = e.currentTarget.dataset.landid
    }
    const nowPlants = this.data.landList.filter(land => land.land_id === id)[0]?.land_plants || []
    console.log(nowPlants);
    this.setData({
      selectedLandId: id,
      plants: nowPlants
    })
  },
  selectPlant: function(e) {
    let plant = ''
    if(e.currentTarget.dataset.plant !== this.data.selectedPlant) {
      plant = e.currentTarget.dataset.plant
    }
    this.setData({
      selectedPlant: plant
    })
  },
  confirm: function() {
    console.log("提交订单");
    if (this.data.selectedLandId == '') {
      wx.showToast({
        title: '请选择土地',
        icon: "none",
      });
      return
    }
    if (this.data.selectedPlant == '') {
      wx.showToast({
        title: '请选择种植作物',
        icon: "none",
      });
      return
    }
    // 参数
    let landMsg
    this.data.landList.forEach(land => {
      if(land.land_id === this.data.selectedLandId){
        landMsg = land
      }
    })
    console.log(landMsg);
    wx.navigateTo({
      url: `/pages/other/order/order?landId=${landMsg.land_id}&landName=${landMsg.land_name}&farmId=${landMsg.farm_id}&price=${landMsg.land_price}&plant=${this.data.selectedPlant}`,
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
  toLand: function (e) {
    wx.navigateTo({
      url: '/pages/other/landDetail/landDetail?farm_id=' + e.currentTarget.dataset.farm_id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.landList.farm_name,
      path: '/pages/other/farmdetail/farmdetail?farm_id=' + this.data.farmId,
      imageUrl: this.data.landList.farm_images
    }
  }
})