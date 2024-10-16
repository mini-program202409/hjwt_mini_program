Page({
  data: {
    genders: ['男', '女'], // 性别选项
    events: [], // 赛事选项
    groups: [], // 分组选项
    roles: [], // 角色选项
    selectedGender: '',
    selectedEvent: '',
    selectedGroup: '',
    selectedRole: '',
  },

  onLoad() {
    // 获取赛事、分组和角色的选项
    this.loadOptions();
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

  onEventChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedEvent: this.data.events[index]
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
    // 选择证件照逻辑
  },

  onSubmit(e) {
    // 提交表单逻辑
    const { username, idNumber, age, institution, phone } = e.detail.value;
    const formData = {
      username,
      idNumber,
      gender: this.data.selectedGender,
      age,
      institution,
      phone,
      event: this.data.selectedEvent,
      group: this.data.selectedGroup,
      role: this.data.selectedRole,
    };
    
    // 发送表单数据到后端
    // this.$api.baoming(formData).then(...)
  }
});
