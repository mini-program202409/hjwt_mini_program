// 我的页面逻辑
Page({
  data: {
    registeredEvents: []
  },

  onLoad() {
    this.fetchRegisteredEvents();
  },

  // 获取已报名赛事数据
  fetchRegisteredEvents() {
    // 从云数据库获取用户报名的赛事信息
    wx.cloud.database().collection('registrations')
      .where({ userId: wx.getStorageSync('userId') })
      .get()
      .then(res => {
        this.setData({ registeredEvents: res.data });
      });
  },

  // 查看赛事详情
  viewEventDetails(e) {
    const eventId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/my_competition/my_competition?id=${eventId}`
    });
  },

  // 删除报名
  deleteEvent(e) {
    const eventId = e.currentTarget.dataset.id;
    wx.cloud.database().collection('registrations')
      .doc(eventId)
      .remove()
      .then(() => {
        wx.showToast({ title: '删除成功', icon: 'success' });
        this.fetchRegisteredEvents(); // 刷新页面
      });
  }
});
