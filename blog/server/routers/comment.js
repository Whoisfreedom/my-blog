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

router.post('/queryComments', async (ctx, next) => {
  let req = ctx.request.body
  let q = {}
  if (req.name) {    //如果有搜索请求就增加查询条件
    //用正则表达式得到的pattern对title属性进行模糊查询
    //这里是搜集合里title属性包含str串的所有结果
    var pattern = new RegExp("^.*"+req.name+".*$");
    q.name = pattern;
  }
  let res = await Comment.find(q, function (err, art) {
    return art
  }).sort({createTime:-1}).skip((req.pageIndex - 1) * req.pageSize).limit(req.pageSize)
  let total = await Comment.find(q, function (err, art) {
    return art
  })
  let totalLenth = total.length
  let resArr = res.map((item) => {
    return {
      createTime: item.createTime,
      text: item.text,
      bindAid: item.bindAid,
      name: item.name
    }
  })
  ctx.status = 200
  ctx.body = {
      code: 0,
      list: resArr,
      total: totalLenth
  }
})


module.exports = router;
