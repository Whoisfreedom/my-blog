var Router = require('koa-router')
const userFunc = require('../utils/user');
// 引入 mongoose 配置文件
const redis = require('../config/redis_config')
redis.get('myKey').then(function (result) {
  console.log(result);
});
var router = new Router()

router.post('/user/login', async (ctx, next) => {
  // console.log(ctx.request.body)
  let req = ctx.request.body
  if (req.username) {
    let findUser = []
    await userFunc.getUser(req.username).then((res) => {
      findUser = res
    }).catch((err) => {
      console.log(err)
    })
    if (findUser && findUser.length > 0) {
      let user = findUser[0]
      console.log(user)
      if (user.password && req.password == 'admin') {
        // redis.set('loginSessionId', findUser.uid)
        // let loginSessionId = await redis.get('loginSessionId', function (err, result) {
        //   return result
        // });
        ctx.status = 200
        ctx.body = {
          code: 0,
          errorMsg: '成功',
          loginSessionId: user.userId,
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
