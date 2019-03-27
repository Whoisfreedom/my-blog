const mysql = require('./query.js')

const articleFun = {
  getArticles: function (title, pageSize, pageIndex) {
    //分页查询文章列表
    let _sql = `select * from article where title LIKE '%${title}%' limit ${(pageIndex - 1) * pageSize},${pageIndex * pageSize};`
    return mysql.query(_sql)
  },
  getArticleTotal: function (title) {
    //分页查询文章列表
    let _sql = `select COUNT(*) AS count from article where title LIKE '%${title}%';`
    return mysql.query(_sql)
  }
}



module.exports = articleFun