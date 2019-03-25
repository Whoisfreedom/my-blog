const mysql = require('./query.js')

const userFunc = {
  getUser: function (name) {
    let _sql = `select * from user where userName="${name}";`
    return mysql.query(_sql)
  }
}

module.exports = userFunc