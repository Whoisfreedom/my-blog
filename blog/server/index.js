import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
const cors = require('koa2-cors')
var bodyParser = require('koa-bodyparser');
// 引入 mongoose 配置文件
var mongoose = require('./mongo/mongoose.js');
// 执行配置文件中的函数，以实现数据库的配置和 Model 的创建等
var db = mongoose();

//获取user路由
var users = require('./routers/users');
var articles = require('./routers/articles');
var comments = require('./routers/comment');
async function start () {
  const app = new Koa()
  app.use(bodyParser());
  //配置跨域请求
  app.use(cors({
    origin: function(ctx) {
      return '*';
    },
  }));


  // const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 80

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  const startRender = async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  }


  app.use(users.routes())
  app.use(articles.routes())
  app.use(comments.routes())
  app.use(startRender)
  
    
  app.listen(port)
  console.log('Server listening on ' + ':' + port) // eslint-disable-line no-console
}

start()
