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
    }).sort({Aid:-1}).limit(10)
    let resArr = res.map((item) => {
    	return {
    	  Aid: item.Aid,
	      createTime: item.createTime,
	      title: item.title
    	}
	})
    ctx.status = 200
    ctx.body = resArr
  }
});

router.post('/searchArticles', async function(ctx, next){
  let req = ctx.request.body
  let loginSessionId = await redis.get('loginSessionId', function (err, result) {
	return result
  });
  if(req.loginSessionId && req.loginSessionId === loginSessionId){
	//判断是否当前登录用户，如果是的话就可以操作
	// 定义查询条件
	let q = {}
	if (req.title) {    //如果有搜索请求就增加查询条件
		//用正则表达式得到的pattern对title属性进行模糊查询
		//这里是搜集合里title属性包含str串的所有结果
		var pattern = new RegExp("^.*"+req.title+".*$");
		q.title = pattern;
	}
	let res = await Article.find(q, function (err, art) {
	return art
    }).sort({Aid:-1}).skip((req.pageIndex - 1) * req.pageSize).limit(req.pageSize)
    let total = await Article.find(q, function (err, art) {
	return art
    })
    let totalLenth = total.length
    let resArr = res.map((item) => {
    	return {
    	  Aid: item.Aid,
	      createTime: item.createTime,
	      title: item.title
    	}
	})
    ctx.status = 200
    ctx.body = {
    	code: 0,
    	list: resArr,
    	total: totalLenth
    }
  }else{
	  ctx.status = 200
	  ctx.body = {
         code: -999,
         errorMsg: '当前未登录，请重新登录'
      }
  }	
});

module.exports = router;
