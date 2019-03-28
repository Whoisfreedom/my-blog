const mysql = require('mysql');
const MYSQL_CONFIG = require('../config/mysql_Config') //数据库配置


//开始链接数据库

//mysql 连接池创建
const pool = mysql.createPool(MYSQL_CONFIG);

//query sql 语句入口

const query = async function (val) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err)
        resolve(err)
      } else {
        connection.query(val, (err, results) => {
          if (err) {
            console.log('数据库操作错误', err)
            reject(err)
          } else {
            // console.log(val)
            console.log('数据库操作成功')
            resolve(results)
          }
          connection.release()
        })
      }
    })
  })

}

// const query = (sql, val) => {
//   return new Promise((resolve, reject) => {

//   })
// }

module.exports = {
  query
}