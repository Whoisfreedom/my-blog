var Router = require('koa-router')

const redis = require('../config/redis_config')
// 引入 mysql 配置文件
const article = require('../utils/article');

var router = new Router()
//创建文章
// router.post('/createArticle', async function (ctx, next) {
//   let req = ctx.request.body
//   let loginSessionId = await redis.get('loginSessionId', function (err, result) {
//     return result
//   });
//   if (req.loginSessionId && req.loginSessionId === loginSessionId) {
//     //判断是否当前登录用户，如果是的话就可以操作
//     let nowTime = new Date;
//     var article = new Article({
//       Aid: nowTime.getTime().toString(),
//       title: req.title,
//       innerHtml: req.innerHtml,
//       createTime: nowTime,
//       type: req.type
//     });
//     let saveerr = article.save(function (err, bobo) {
//       if (err) return console.error(err);
//     });
//     if (saveerr) {
//       ctx.status = 200
//       ctx.body = {
//         code: -1,
//         errorMsg: saveerr
//       }
//     } else {
//       ctx.status = 200
//       ctx.body = {
//         code: 0,
//         errorMsg: '新增成功'
//       }
//     }
//   } else {
//     ctx.status = 200
//     ctx.body = {
//       code: -999,
//       errorMsg: '当前未登录，请重新登录'
//     }
//   }
// });
// //修改文章
// router.post('/updateArticle', async function (ctx, next) {
//   let req = ctx.request.body
//   let loginSessionId = await redis.get('loginSessionId', function (err, result) {
//     return result
//   });
//   if (req.loginSessionId && req.loginSessionId === loginSessionId) {
//     //判断是否当前登录用户，如果是的话就可以操作

//     let updatedata = {
//       $set: {
//         title: req.title,
//         innerHtml: req.innerHtml
//       }
//     };
//     let saveerr = await Article.update({ Aid: req.Aid }, updatedata, function (err, person) {
//       if (err) return console.error(err);
//     })
//     if (!saveerr.ok) {
//       ctx.status = 200
//       ctx.body = {
//         code: -1,
//         errorMsg: saveerr
//       }
//     } else {
//       ctx.status = 200
//       ctx.body = {
//         code: 0,
//         errorMsg: '修改成功'
//       }
//     }
//   } else {
//     ctx.status = 200
//     ctx.body = {
//       code: -999,
//       errorMsg: '当前未登录，请重新登录'
//     }
//   }
// });
// // 首页获取前10文章
// router.post('/getArticles', async function (ctx, next) {
//   if (ctx.request.header.connection != 'close') {
//     let res = await Article.find(function (err, art) {
//       return art
//     }).sort({ Aid: -1 }).limit(10)
//     let resArr = res.map((item) => {
//       return {
//         Aid: item.Aid,
//         createTime: item.createTime,
//         title: item.title,
//         type: item.type
//       }
//     })
//     ctx.status = 200
//     ctx.body = resArr
//   }
// });
// 分页查询
router.post('/article/searchArticles', async function (ctx, next) {
  let req = ctx.request.body
  // 定义查询条件
  //文章列表
  let articleList = [];
  //总文章数量
  let totalLength = 0;
  await article.getArticles(req.title, req.pageSize, req.pageIndex).then((res) => {
    //数据库获取相应的文章列表
    articleList = res
  }).catch((err) => {

  })
  await article.getArticleTotal(req.title).then((res) => {
    //数据库获取相应的文章总数
    totalLength = res[0].count
  }).catch((err) => {

  })

  ctx.status = 200
  ctx.body = {
    code: 0,
    list: articleList,
    total: totalLength
  }
});

// 查询详情
// router.post('/articleDetail', async function (ctx, next) {
//   let req = ctx.request.body
//   // 定义查询条件
//   let res = await Article.find({ Aid: req.Aid }, function (err, art) {
//     return art
//   })
//   if (res && res.length > 0) {
//     ctx.status = 200
//     ctx.body = {
//       code: 0,
//       article: res[0]
//     }
//   } else {
//     ctx.status = 200
//     ctx.body = {
//       code: -1,
//       errorMsg: '查询失败'
//     }
//   }

// });

//删除文章
// router.post('/delArticles', async function (ctx, next) {
//   let req = ctx.request.body
//   let loginSessionId = await redis.get('loginSessionId', function (err, result) {
//     return result
//   });
//   if (req.loginSessionId && req.loginSessionId === loginSessionId) {
//     //判断是否当前登录用户，如果是的话就可以操作
//     // 定义查询条件
//     let res = await Article.remove({ Aid: req.Aid }, function (err, art) {
//       return art
//     })
//     if (res.ok == 1) {
//       ctx.status = 200
//       ctx.body = {
//         code: 0,
//         errorMsg: '删除成功',
//       }
//     } else {
//       ctx.status = 200
//       ctx.body = {
//         code: -1,
//         errorMsg: '删除失败',
//       }
//     }

//   } else {
//     ctx.status = 200
//     ctx.body = {
//       code: -999,
//       errorMsg: '当前未登录，请重新登录'
//     }
//   }
// });

module.exports = router;
