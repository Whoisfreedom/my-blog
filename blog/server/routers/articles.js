var Router = require('koa-router')
var Redis = require('ioredis')
var redis = new Redis();
var mongoose = require('mongoose');
// 引入 mongoose 配置文件
var Article = mongoose.model('Article');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo success')
});

var router = new Router()

// router.post('/createArticle', async function(ctx, next){
//   if(ctx.request.header.connection != 'close'){
//     console.log(ctx.request)
//     let nowTime = new Date;
//     var article = new Article({ 
//       Aid: nowTime.getTime().toString(),
//       title: '文章标题',
//       innerHtml: '<p>这是测试文章内容<p>' + nowTime.toString(),
//       createTime: nowTime, 
//     });
//     article.save(function (err, bobo) {
//       if (err) return console.error(err);
//     });
//     let res = await Article.find(function (err, art) {
//       // if (err) return console.error(err);
//       // console.log(kittens)
//       return art
//     })
//     // console.log(res)
    
//     ctx.status = 200
//     ctx.body = res
//   }
// });

router.post('/getArticles', async function(ctx, next){
  if(ctx.request.header.connection != 'close'){
    let res = await Article.find(function (err, art) {
      return art
    })
    ctx.status = 200
    ctx.body = res
  }
});

module.exports = router;
