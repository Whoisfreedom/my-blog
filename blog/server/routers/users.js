var Router = require('koa-router')
const userFunc = require('../utils/user');
// 引入 mysql 配置文件
const redis = require('../config/redis_config')
var router = new Router()

router.post('/user/login', async (ctx, next) => {
  let req = ctx.request.body
  if (req.username) {
    let findUser = []
    await userFunc.getUser(req.username).then((res) => {
      //数据库获取相应的用户信息
      findUser = res
    }).catch((err) => {
      console.log(err)
    })
    if (findUser && findUser.length > 0) {
      //若存在用户，则获取用户信息并校对密码
      let user = findUser[0]
      if (user.password && req.password == user.password) {
        let sessionId = new Date().getTime() + '' + parseInt(Math.random() * 100);
        redis.set('loginSessionId', sessionId, 'EX', 1800)
        // let loginSessionId = await redis.get('loginSessionId', function (err, result) {
        //   return result
        // });
        ctx.status = 200
        ctx.body = {
          code: 0,
          errorMsg: '成功',
          loginSessionId: sessionId,
          userName: user.userName,
        }
      } else {
        ctx.status = 200
        ctx.body = {
          code: -1,
          errorMsg: '密码错误'
        }
      }

    } else {
      ctx.status = 200
      ctx.body = {
        code: -1,
        errorMsg: '用户不存在'
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: -1,
      errorMsg: '请输入用户名'
    }
  }


}, async (ctx) => {
  //中间件，可以用来判断用户
  ctx.isLogin = false
})

// router.post('/getusers', async (ctx, next) => {
//   console.log(ctx.request)
//   ctx.status = 200
//   redis.set('hello', 'this is hello')
//   ctx.body = await redis.get('hello', function (err, result) {
//     return result
//   });
// })

// router.post('/getCodeList', async function (ctx, next) {
//   if (ctx.request.header.connection != 'close') {
//     ctx.status = 200
//     ctx.body = {
//       code: 0,
//       codeList: codeList.default
//     }
//   }
// });

module.exports = router;
