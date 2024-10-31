// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const db = cloud.database();
    const result = await db.collection('registrations').add({
      data: event.formData
    });

    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}