const mysql = require('./query.js')

const articleFun = {
  getArticles: function (title, type, pageSize, pageIndex) {
    //分页查询文章列表
    let typeLetter = type ? `AND articleType = '${type}'` : ''
    let _sql = `select * from article where title LIKE '%${title}%' ${typeLetter} limit ${(pageIndex - 1) * pageSize},${pageIndex * pageSize};`
    return mysql.query(_sql)
  },
  getArticleTotal: function (title, type) {
    //分页查询文章列表
    let typeLetter = type ? `AND articleType = '${type}'` : ''
    let _sql = `select COUNT(*) AS count from article where title LIKE '%${title}%' ${typeLetter};`
    return mysql.query(_sql)
  },
  getArticleById: function (articleId) {
    //根据id查询文章列表
    let _sql = `select * from article where articleId = '${articleId}';`
    return mysql.query(_sql)
  },
  addArticle: function (title, text, createTime, articleType, typedesc) {
    //新增文章
    let _sql = `INSERT INTO article ( title, text,createTime, articleType,typedesc)
    VALUES
    ( '${title}', '${text}','${createTime}','${articleType}' ,'${typedesc}');`
    return mysql.query(_sql)
  },
  updateArticle: function (articleId, title, text, articleType, typedesc) {
    //新增文章
    let _sql = `UPDATE article
    SET 
    title = '${title}',
    text = '${text}',
    articleType = '${articleType}',
    typedesc = '${typedesc}'
    WHERE
    articleId = '${articleId}';`
    return mysql.query(_sql)
  },
  delArticle: function (articleId) {
    //新增文章
    let _sql = `DELETE FROM article WHERE articleId='${articleId}';`
    return mysql.query(_sql)
  },
}



module.exports = articleFun