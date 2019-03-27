const mysql = require('./query.js')

const userFunc = {
  getUser: function (name) {
    let _sql = `select * from getUser`
    return mysql.query(_sql)
  }
}

module.exports = userFunc