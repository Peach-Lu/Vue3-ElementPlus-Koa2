const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "userEmail": String,
  "mobile": String,
  "sex": Number,
  "deptId": [],
  "job": String,
  "state": {
    type: Number,
    default: 1
  },
  "role": {
    type: Number,
    default: 1
  },
  "roleList": [],
  "createTime": {
    type: Date,
    default: Date.now()
  },//创建时间
  "lastLoginTime": {
    type: Date,
    default: Date.now()
  },//更新时间
  "remark": String
})
module.exports = mongoose.model("users", userSchema, "users")