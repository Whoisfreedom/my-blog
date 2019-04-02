const mysql = require('./query.js')

const typeFunc = {
  getTypeList: function () {
    let _sql = `SELECT * FROM typeList`
    return mysql.query(_sql)
  }
}

module.exports = typeFunc