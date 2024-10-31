// 赛事详情页面逻辑
Page({
  data: {
    record: {},
    tournaments: [], // 赛事信息
    tournamentNames: [], // 赛事选项
    groups: [], // 分组选项
    roles: [], // 角色选项
    selectedGender: '',
    selectedTournament: '',
    selectedGroup: '',
    selectedRole: '',
  },

  onLoad(options) {
    const app = getApp();
    this.setData({
      record: options.record,
      genders: app.globalData.genders,
      selectedGender: options.record.gender,
      idPhotoPath: options.record.id_photo_url,
      selectedTournament: options.record.tournament,
      tournamentNames: 
    });
  },
});
