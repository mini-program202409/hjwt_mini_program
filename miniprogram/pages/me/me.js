// 我的页面逻辑
Page({
  data: {
    registeredTournaments: []
  },

  onLoad() {
    this.getRegisteredTournaments();
  },

  // 获取已报名赛事数据
  getRegisteredTournaments() {
    wx.showLoading();
    const app = getApp();
    const userOpenId = app.globalData.openId;
    wx.cloud.callFunction({
      name: 'getRegistrationRecord',
      data: {
        userOpenId,
      },
    }).then(res => {
      wx.hideLoading();
      this.setData({
        registeredTournaments: res.result.data
      });
      console.log('get record succeed.');
    }).catch(e => {
      wx.hideLoading();
      console.log('get record failed.', e);
    });
  },

  // 查看赛事详情
  viewEventDetails(e) {
    const record = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/my_competition/my_competition?record=${record}`
    });
  },

  // 删除报名
  deleteEvent(e) {
    const eventId = e.currentTarget.dataset.id;
    // wx.cloud.database().collection('registrations')
    //   .doc(eventId)
    //   .remove()
    //   .then(() => {
    //     wx.showToast({ title: '删除成功', icon: 'success' });
    //     this.fetchregisteredTournaments(); // 刷新页面
    //   });
  }
});
