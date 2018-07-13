import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import users from './routers/users'



async function start () {
  const route = require('koa-route');
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
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

  var db = {
    tobi: { name: 'tobi', species: 'ferret' },
    loki: { name: 'loki', species: 'ferret' },
    jane: { name: 'jane', species: 'ferret' }
  };
  var pets = {
    list: (ctx) => {
      ctx.status = 200
      ctx.body = 'pet'
      console.log(ctx)
    },
   
    show: (ctx, name) => {
      console.log(ctx)
      var pet = db[name];
      if (!pet) return ctx.throw('cannot find that pet', 404);
      ctx.body = pet.name + ' is a ' + pet.species;
    }
  };
  app.use(route.get('/pets', pets.list));
  app.use(route.get('/pets/:name', pets.show));
  app.use(startRender)
  
  app.listen(port)
  console.log('Server listening on ' + ':' + port) // eslint-disable-line no-console
}

start()
