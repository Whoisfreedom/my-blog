const mysql = require('./query.js')

const userFunc = {
  getUser: function (name) {
    let _sql = `SELECT * FROM user WHERE userName = "${name}"`
    return mysql.query(_sql)
  }
}

module.exports = userFunc