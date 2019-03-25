const mysql = require('mysql');
const MYSQL_CONFIG = require('../config/mysql_Config') //数据库配置

//mysql 连接池创建
const pool = mysql.createPool('MYSQL_CONFIG');

//query sql 语句入口

const query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        //链接错误
        reject(err)
      } else {
        connection.query(sql, val, (err, fields) => {
          if (err) reject(err)
          else resolve(fields)
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}