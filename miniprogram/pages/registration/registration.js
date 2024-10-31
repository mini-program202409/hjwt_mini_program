Page({
  data: {
    tournaments: [], // 赛事信息
    tournamentNames: [], // 赛事选项
    groups: [], // 分组选项
    roles: [], // 角色选项
    selectedGender: '',
    selectedTournament: '',
    selectedGroup: '',
    selectedRole: '',
    idPhotoPath: ''
  },

  onLoad() {
    wx.showLoading();
    // 获取赛事、分组和角色的选项
    const app = getApp();
    this.setData({
      genders: app.globalData.genders
    });
    this.loadOptions();
    this.loadTournaments();
    wx.hideLoading();
  },

  loadOptions() {
    // 这里调用后端接口，获取赛事、分组和角色的选项
    // 例如：this.$api.getEvents().then(...)
  },

  onGenderChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedGender: this.data.genders[index]
    });
  },

  loadTournaments(e) {
    wx.cloud.callFunction({
      name: 'selectTournaments',
    }).then((resp) => {
      this.setData({
        tournaments: resp.result.data,
        tournamentNames: resp.result.data.map(item => item.name)
      });
    }).catch((err) => {
      console.log("something wrong happened: " + err);
    });
  },
  onTournamentSelect(e) {
    const index = e.detail.value;
    this.setData({
      selectedTournament: this.data.tournaments[index].name,
      groups: this.data.tournaments[index].group,
      roles: this.data.tournaments[index].role
    });
  },

  onGroupChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedGroup: this.data.groups[index]
    });
  },

  onRoleChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedRole: this.data.roles[index]
    });
  },

  chooseAvatar() {
    wx.showLoading({
      title: '',
    });
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        this.setData({
          idPhotoPath: res.tempFiles[0].tempFilePath
        });
        wx.hideLoading();
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('choose id photo failed.', err)
      }
    })
  },

  onSubmit(e) {
    wx.showLoading({
      title: '',
    });
    // 提交表单逻辑
    const app = getApp();
    const { username, idNumber, age, institution, phone } = e.detail.value;

    const userOpenId = app.globalData.openId;
    const tournamentName = this.data.selectedTournament;
    const groupName = this.data.selectedGroup;
    const roleName = this.data.selectedRole;
    const photoCloudPath = `${userOpenId}/images/${idNumber}-${tournamentName}-${groupName}-${roleName}.png`;

    wx.cloud.uploadFile({
      cloudPath: photoCloudPath,
      filePath: this.data.idPhotoPath,
    }).then(res => {
      const formData = {
        name: username,
        id: idNumber,
        gender: this.data.selectedGender,
        age: age,
        institution: institution,
        phone_number: phone,
        id_photo_url: res.fileID,
        tournament: tournamentName,
        group: groupName,
        role: roleName,
        user_open_id: userOpenId
      };
      wx.cloud.callFunction({
        name: 'addRegistrationRecord',
        data: {
          formData
        },
        success: function(res) {
          if (res.result.success) {
            console.log('报名成功。');
          } else {
            console.error('报名失败, error msg: ', res.result.message);
          }
        }
      });
      wx.hideLoading();
    }).catch(e => {
      console.error("Error: ", e.message);
      wx.hideLoading();
      wx.showModal({
        title: '上传失败',
        content: '提交失败，请稍后再试。',
        showCancel: true,
        cancelText: '关闭'
      })
    });
  }
});
