module.exports = {
  formatDate(timeStamp, pattern) {
    const str = typeof pattern === 'string' ? pattern : 'yyyy-MM-dd';
    const date = new Date(timeStamp);
    const fixLen = function (num, len) {
      let r = `${num}`;
      while (r.length < len) {
        r = `0${r}`;
      }
      return r;
    };
    if (!isNaN(date.getTime())) {
      return str
        .replace(/yyyy/i, fixLen(date.getFullYear(), 4))
        .replace(/MM/, fixLen(date.getMonth() + 1, 2))
        .replace(/dd/i, fixLen(date.getDate(), 2))
        .replace(/hh/i, fixLen(date.getHours(), 2))
        .replace(/mm/, fixLen(date.getMinutes(), 2))
        .replace(/ss/i, fixLen(date.getSeconds(), 2));
    }
    return '';
  }
}