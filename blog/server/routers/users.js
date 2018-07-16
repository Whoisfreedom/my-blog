const usersRequest = {
    userInfo: (ctx) => {
      ctx.status = 200
      ctx.body = 'Hello World';
    },
    setUser: (ctx) => {
      ctx.status = 200
      ctx.body = 'redis 已经创建';
    },
}

module.exports = usersRequest
