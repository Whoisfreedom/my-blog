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
  ctx.status = 200
  ctx.body = '登录请求成功'
})

router.post('/getusers', async (ctx, next) => {
  console.log(ctx.request)
  ctx.status = 200
  redis.set('hello', 'this is hello')
  ctx.body = await redis.get('hello', function (err, result) {
    return result
  });
})

router.post('/test', async function(ctx, next){
  if(ctx.request.header.connection != 'close'){
    var bobo = new User({ name: 'bobo' });
    bobo.save(function (err, bobo) {
      if (err) return console.error(err);
    });
    let res = await User.find(function (err, users) {
      // if (err) return console.error(err);
      // console.log(kittens)
      return users
    })
    // console.log(res)
    
    ctx.status = 200
    ctx.body = res
  }
});

module.exports = router;
