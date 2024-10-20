const router = require('koa-router')()
const User = require('../model/userSchema')
// const utils = require('../utils')
router.prefix('/users')

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body
    const res = await User.findOne({
      userName,
      userPwd
    })
    console.log('res', res)
    if (res) {
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: res
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '帐号或密码错误'
      }
    }
    console.log('res', res)
  } catch (error) {
    console.log('err', error)
  }
})
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
