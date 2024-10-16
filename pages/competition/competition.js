Page({
  navigateToRegistration() {
    wx.navigateTo({
      url: '/pages/registration/registration' // 报名页面的路径
    });
  },

  navigateToDownload() {
    wx.navigateTo({
      url: '/pages/download/download' // 文件下载页面的路径
    });
  }
});
