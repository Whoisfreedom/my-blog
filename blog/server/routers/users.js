var Router = require('koa-router')
var Redis = require('ioredis')
var redis = new Redis();
var mongoose = require('mongoose');
// 引入 mongoose 配置文件
var User = mongoose.model('User');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo success')
});
var router = new Router()

router.post('/userlogin', async (ctx, next) => {
  console.log(ctx.request.body)
  let req = ctx.request.body
  let loginuser = await User.find({"userName": req.userName}, function (err, users) {
      return users
  })
  if(loginuser && loginuser.length>0){
    let findUser = loginuser[0]
    if(findUser.passWord === req.passWord){
      redis.set('loginSessionId', findUser.uid)
      let loginSessionId = await redis.get('loginSessionId', function (err, result) {
        return result
      });
      console.log(loginSessionId)
      ctx.status = 200
      ctx.body = {
        code: 0,
        errorMsg: null,
        loginSessionId: findUser.uid,
        userName: findUser.userName
      }
    }else{
      ctx.status = 200
      ctx.body = {
        code: -1,
        errorMsg: '密码错误'
      }
    }
    
  }else{
    ctx.status = 200
    ctx.body = {
      code: -1,
      errorMsg: '用户不存在'
    }
  }
  console.log(loginuser)
  
})

router.post('/getusers', async (ctx, next) => {
  console.log(ctx.request)
  ctx.status = 200
  redis.set('hello', 'this is hello')
  ctx.body = await redis.get('hello', function (err, result) {
    return result
  });
})

// router.post('/setuser', async function(ctx, next){
//   if(ctx.request.header.connection != 'close'){
//     var bobo = new User({ 
//       userName: 'whoisfreedom',
//       uid: 'lzywbb',
//       createTime: new Date(),
//       lastLogin:new Date(),
//       passWord: 'fdc5e2ac5e397b12ff425d71cbcc0c45'
//      });
//     bobo.save(function (err, bobo) {
//       if (err) return console.error(err);
//     });
//     let res = await User.find(function (err, users) {
//       // if (err) return console.error(err);
//       // console.log(kittens)
//       return users
//     })
//     // console.log(res)
    
//     ctx.status = 200
//     ctx.body = res
//   }
// });

module.exports = router;
