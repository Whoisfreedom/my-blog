var Router = require('koa-router')
var Redis = require('ioredis')
var redis = new Redis();
var mongoose = require('mongoose');
// 引入 mongoose 配置文件
var Comment = mongoose.model('Comment');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo success')
});
var router = new Router()

router.post('/setComment', async (ctx, next) => {
  let req = ctx.request.body
  let nowTime = new Date;
  var comment = new Comment({ 
    bindAid: req.bindAid,
    createTime: nowTime,
    text: req.text,
    name: req.name
  });
  let saveerr = comment.save(function (err, bobo) {
    if (err) return console.error(err);
  });
  if(saveerr){
    ctx.status = 200
    ctx.body = {
          code: -1,
          errorMsg: saveerr
      }
  }else{
    ctx.status = 200
    ctx.body = {
          code: 0,
          errorMsg: '评论成功'
      }
  }
})

router.post('/getComments', async (ctx, next) => {
  let req = ctx.request.body
  let res = await Comment.find({bindAid: req.bindAid}, function (err, art) {
      return art
    }).sort({createTime:-1})
  let resArr = res.map((item) => {
    return {
      createTime: item.createTime,
      text: item.text,
      name: item.name
    }
  })
  ctx.status = 200
  ctx.body = resArr
})


module.exports = router;
