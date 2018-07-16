import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
const cors = require('koa2-cors');
const redis = require('redis')
import users from './routers/users'



async function start () {
  const app = new Koa()
  var client = redis.createClient(6379, 'localhost')
  //配置跨域请求
  app.use(cors({
    origin: function(ctx) {
      return '*';
    },
  }));
  const route = require('koa-route')
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

  app.use(route.get('/users', users.userInfo))
  app.use(route.get('/setusers', users.setUser))
  app.use(route.get('/getusers', async (ctx) => {
        ctx.status = 200
        ctx.body = await client.get("hello", function(err, v){
          console.log(v)
        })
  }))
  app.use(startRender)
    
  app.listen(port)
  console.log('Server listening on ' + ':' + port) // eslint-disable-line no-console
}

start()
