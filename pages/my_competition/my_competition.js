// 赛事详情页面逻辑
Page({
  data: {
    eventDetail: {}
  },

  onLoad(options) {
    const eventId = options.id;
    this.fetchEventDetail(eventId);
  },

  fetchEventDetail(eventId) {
    wx.cloud.database().collection('registrations')
      .doc(eventId)
      .get()
      .then(res => {
        this.setData({ eventDetail: res.data });
      });
  }
});
