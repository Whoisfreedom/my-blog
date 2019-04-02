var Router = require('koa-router')
const redis = require('../config/redis_config')
// 引入 mysql 配置文件
const article = require('../utils/article');
const typeFunc = require('../utils/type');

const common = require('../common/common');
var router = new Router()
// 创建文章
router.post('/article/createArticle', async function (ctx, next) {
  let req = ctx.request.body
  let reqHead = ctx.request.header
  let loginSessionId = await redis.get('loginSessionId', function (err, result) {
    return result
  });
  if (reqHead['x-token'] && reqHead['x-token'] === loginSessionId) {
    //判断是否当前登录用户，如果是的话就可以操作
    let nowTime = new Date;
    let state = true;
    let saveerr = null;
    let type = typeList.find(item => item.code === req.type)
    let createTime = common.formatDate(nowTime.getTime(), 'yyyy-MM-dd hh:mm:ss');
    await article.addArticle(req.title, req.text, createTime, req.type, type.label).then((res, row) => {
      //数据库获取相应的文章列表
      if (res.affectedRows == 1) {
        //新增成功
        state = false;
      }
    }).catch((err) => {
      saveerr = err
    })
    if (state) {
      ctx.status = 200
      ctx.body = {
        code: -1,
        errorMsg: saveerr
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 0,
        errorMsg: '新增成功'
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: -999,
      errorMsg: '当前未登录，请重新登录'
    }
  }
});
//修改文章
router.post('/article/updateArticle', async function (ctx, next) {
  let req = ctx.request.body
  let reqHead = ctx.request.header
  let loginSessionId = await redis.get('loginSessionId', function (err, result) {
    return result
  });
  if (reqHead['x-token'] && reqHead['x-token'] === loginSessionId) {
    //判断是否当前登录用户，如果是的话就可以操作
    let state = true;
    let saveerr = null;
    let type = typeList.find(item => item.code === req.type)
    await article.updateArticle(req.articleId, req.title, req.text, req.type, type.label).then((res, row) => {
      //数据库获取相应的文章列表
      if (res.affectedRows == 1) {
        //修改成功
        state = false;
      }
    }).catch((err) => {
      saveerr = err
    })
    if (state) {
      ctx.status = 200
      ctx.body = {
        code: -1,
        errorMsg: saveerr
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 0,
        errorMsg: '修改成功'
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: -999,
      errorMsg: '当前未登录，请重新登录'
    }
  }
});
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
  await article.getArticles(req.title, req.type, req.pageSize, req.pageIndex).then((res) => {
    //数据库获取相应的文章列表
    articleList = res
  }).catch((err) => {

  })
  await article.getArticleTotal(req.title, req.type).then((res) => {
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
//获取文章类型列表
router.get('/article/articleType', async function (ctx, next) {
  //文章列表
  let typeList = [];
  //总文章数量
  await typeFunc.getTypeList().then((res) => {
    //数据库获取相应的文章列表
    typeList = res
  }).catch((err) => {

  })
  if (typeList && typeList.length > 0) {
    ctx.status = 200
    ctx.body = {
      code: 0,
      data: typeList
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: -1,
      errorMsg: '获取字典失败'
    }
  }
});

// 查询详情
router.post('/article/articleById', async function (ctx, next) {
  let req = ctx.request.body
  // 定义查询条件
  let artList = []
  await article.getArticleById(req.id).then((res) => {
    //数据库获取相应的文章列表
    artList = res
  }).catch((err) => {

  })

  if (artList && artList.length > 0) {
    ctx.status = 200
    ctx.body = {
      code: 0,
      article: artList[0]
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: -1,
      errorMsg: '查询失败'
    }
  }

});

//删除文章
router.post('/article/delArticles', async function (ctx, next) {
  let req = ctx.request.body
  let reqHead = ctx.request.header
  let loginSessionId = await redis.get('loginSessionId', function (err, result) {
    return result
  });
  if (reqHead['x-token'] && reqHead['x-token'] === loginSessionId) {
    //判断是否当前登录用户，如果是的话就可以操作
    let state = true;
    let saveerr = null;
    await article.delArticle(req.articleId).then((res, row) => {
      //数据库获取相应的文章列表
      if (res.affectedRows == 1) {
        //删除成功
        state = false;
      }
    }).catch((err) => {
      saveerr = err
    })
    if (state) {
      ctx.status = 200
      ctx.body = {
        code: -1,
        errorMsg: saveerr,
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 0,
        errorMsg: '删除成功',
      }
    }

  } else {
    ctx.status = 200
    ctx.body = {
      code: -999,
      errorMsg: '当前未登录，请重新登录'
    }
  }
});

module.exports = router;
