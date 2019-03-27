var Router = require('koa-router')
const userFunc = require('../utils/user');
// 引入 mongoose 配置文件
const redis = require('../config/redis_config')
redis.get('myKey').then(function (result) {
  console.log(result);
});
var router = new Router()

router.get('/userlogin', async (ctx, next) => {
  // console.log(ctx.request.body)
  // let req = ctx.request.body
  userFunc.getUser('blogManage').then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  return
  if (loginuser && loginuser.length > 0) {
    let findUser = loginuser[0]
    if (findUser.passWord === req.passWord) {
      // redis.set('loginSessionId', findUser.uid)
      // let loginSessionId = await redis.get('loginSessionId', function (err, result) {
      //   return result
      // });
      ctx.status = 200
      ctx.body = {
        code: 0,
        errorMsg: null,
        loginSessionId: findUser.uid,
        userName: findUser.userName,
        codeList: codeList.default
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
  console.log(loginuser)

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
