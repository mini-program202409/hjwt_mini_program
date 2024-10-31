// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  // 从云数据库获取用户报名的赛事信息
  return await db.collection('registrations')
    .where({ user_open_id: event.userOpenId })
    .get();
}