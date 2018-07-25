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

router.post('/createArticle', async function(ctx, next){
	let req = ctx.request.body
	let loginSessionId = await redis.get('loginSessionId', function (err, result) {
        return result
      });
	if(req.loginSessionId && req.loginSessionId === loginSessionId){
		//判断是否当前登录用户，如果是的话就可以操作
		let nowTime = new Date;
		var article = new Article({ 
		  Aid: nowTime.getTime().toString(),
		  title: req.title,
		  innerHtml: req.innerHtml,
		  createTime: nowTime, 
		});
		let saveerr = article.save(function (err, bobo) {
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
		        errorMsg: '新增成功'
		    }
		}
	}else{
		ctx.status = 200
		ctx.body = {
	        code: -999,
	        errorMsg: '当前未登录，请重新登录'
	    }
	}
	

	
});

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
