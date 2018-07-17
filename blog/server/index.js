import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
const cors = require('koa2-cors');
var Redis = require('ioredis');
const Router = require('koa-router')



async function start () {
  const app = new Koa()
  var router = new Router()
  var redis = new Redis();
  //配置跨域请求
  app.use(cors({
    origin: function(ctx) {
      return '*';
    },
  }));
  
  // const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 8080

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

  router.get('/getusers', async (ctx, next) => {
        ctx.status = 200
        redis.set('hello', 'this is hello')
        ctx.body = await redis.get('hello', function (err, result) {
          return result
        });
  })
  app
  .use(router.routes())
  .use(router.allowedMethods());
  app.use(startRender)
  
    
  app.listen(port)
  console.log('Server listening on ' + ':' + port) // eslint-disable-line no-console
}

start()
