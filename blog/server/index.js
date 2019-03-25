import Koa from 'koa'
const cors = require('koa2-cors')
var bodyParser = require('koa-bodyparser');
// 执行配置文件中的函数，以实现数据库的配置和 Model 的创建等
var db = mongoose();

//获取user路由
var users = require('./routers/users');
var articles = require('./routers/articles');
var comments = require('./routers/comment');
async function start() {
  const app = new Koa()
  app.use(bodyParser());
  //配置跨域请求
  app.use(cors({
    origin: function (ctx) {
      return '*';
    },
  }));


  // const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 80

  app.use(users.routes())
  app.use(articles.routes())
  app.use(comments.routes())
  app.use(startRender)


  app.listen(port)
  console.log('Server listening on ' + ':' + port) // eslint-disable-line no-console
}

start()
