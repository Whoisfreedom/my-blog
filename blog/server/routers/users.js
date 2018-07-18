var Router = require('koa-router')
var Redis = require('ioredis')
var redis = new Redis();
var mongoose = require('mongoose');
// 引入 mongoose 配置文件
mongoose.connect('mongodb://localhost:27017/test', {"useNewUrlParser": true});
// 执行配置文件中的函数，以实现数据库的配置和 Model 的创建等
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo success')
});
var router = new Router()

var kittySchema = mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

router.get('/getusers', async (ctx, next) => {
  console.log(ctx.request)
  ctx.status = 200
  redis.set('hello', 'this is hello')
  ctx.body = await redis.get('hello', function (err, result) {
    return result
  });
})

router.get('/test', async function(ctx, next){
  if(ctx.request.header.connection != 'close'){
    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.save(function (err, fluffy) {
      if (err) return console.error(err);
    });
    let res = await Kitten.find(function (err, kittens) {
      // if (err) return console.error(err);
      // console.log(kittens)
      return kittens
    })
    // console.log(res)
    
    ctx.status = 200
    ctx.body = res
  }
});

module.exports = router;
