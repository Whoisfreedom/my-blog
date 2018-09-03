require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("mongoose");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("ioredis");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '我的博客',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global JS
  */
  plugins: ['~plugins/myHttp.js'],
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/css/main.css' }],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

module.exports = function () {
  var db = mongoose.connect("mongodb://localhost:27017/test", { "useNewUrlParser": true });

  __webpack_require__(16);
  __webpack_require__(14);
  __webpack_require__(15);
  return db;
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = __webpack_require__(3);
var Redis = __webpack_require__(2);
var redis = new Redis();
var mongoose = __webpack_require__(0);
// 引入 mongoose 配置文件
var Article = mongoose.model('Article');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('mongo success');
});

var router = new Router();
//创建文章
router.post('/createArticle', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
		var req, loginSessionId, nowTime, article, saveerr;
		return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						req = ctx.request.body;
						_context.next = 3;
						return redis.get('loginSessionId', function (err, result) {
							return result;
						});

					case 3:
						loginSessionId = _context.sent;

						if (req.loginSessionId && req.loginSessionId === loginSessionId) {
							//判断是否当前登录用户，如果是的话就可以操作
							nowTime = new Date();
							article = new Article({
								Aid: nowTime.getTime().toString(),
								title: req.title,
								innerHtml: req.innerHtml,
								createTime: nowTime,
								type: req.type
							});
							saveerr = article.save(function (err, bobo) {
								if (err) return console.error(err);
							});

							if (saveerr) {
								ctx.status = 200;
								ctx.body = {
									code: -1,
									errorMsg: saveerr
								};
							} else {
								ctx.status = 200;
								ctx.body = {
									code: 0,
									errorMsg: '新增成功'
								};
							}
						} else {
							ctx.status = 200;
							ctx.body = {
								code: -999,
								errorMsg: '当前未登录，请重新登录'
							};
						}

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());
//修改文章
router.post('/updateArticle', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
		var req, loginSessionId, updatedata, saveerr;
		return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						req = ctx.request.body;
						_context2.next = 3;
						return redis.get('loginSessionId', function (err, result) {
							return result;
						});

					case 3:
						loginSessionId = _context2.sent;

						if (!(req.loginSessionId && req.loginSessionId === loginSessionId)) {
							_context2.next = 12;
							break;
						}

						//判断是否当前登录用户，如果是的话就可以操作

						updatedata = { $set: { title: req.title,
								innerHtml: req.innerHtml }
						};
						_context2.next = 8;
						return Article.update({ Aid: req.Aid }, updatedata, function (err, person) {
							if (err) return console.error(err);
						});

					case 8:
						saveerr = _context2.sent;

						if (!saveerr.ok) {
							ctx.status = 200;
							ctx.body = {
								code: -1,
								errorMsg: saveerr
							};
						} else {
							ctx.status = 200;
							ctx.body = {
								code: 0,
								errorMsg: '修改成功'
							};
						}
						_context2.next = 14;
						break;

					case 12:
						ctx.status = 200;
						ctx.body = {
							code: -999,
							errorMsg: '当前未登录，请重新登录'
						};

					case 14:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());
// 首页获取前10文章
router.post('/getArticles', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
		var res, resArr;
		return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						if (!(ctx.request.header.connection != 'close')) {
							_context3.next = 7;
							break;
						}

						_context3.next = 3;
						return Article.find(function (err, art) {
							return art;
						}).sort({ Aid: -1 }).limit(10);

					case 3:
						res = _context3.sent;
						resArr = res.map(function (item) {
							return {
								Aid: item.Aid,
								createTime: item.createTime,
								title: item.title,
								type: item.type
							};
						});

						ctx.status = 200;
						ctx.body = resArr;

					case 7:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());
// 分页查询
router.post('/searchArticles', function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4(ctx, next) {
		var req, loginSessionId, q, pattern, res, total, totalLenth, resArr;
		return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						req = ctx.request.body;
						_context4.next = 3;
						return redis.get('loginSessionId', function (err, result) {
							return result;
						});

					case 3:
						loginSessionId = _context4.sent;

						if (!(req.loginSessionId && req.loginSessionId === loginSessionId)) {
							_context4.next = 19;
							break;
						}

						//判断是否当前登录用户，如果是的话就可以操作
						// 定义查询条件
						q = {};

						if (req.title) {
							//如果有搜索请求就增加查询条件
							//用正则表达式得到的pattern对title属性进行模糊查询
							//这里是搜集合里title属性包含str串的所有结果
							pattern = new RegExp("^.*" + req.title + ".*$");

							q.title = pattern;
						}
						_context4.next = 9;
						return Article.find(q, function (err, art) {
							return art;
						}).sort({ Aid: -1 }).skip((req.pageIndex - 1) * req.pageSize).limit(req.pageSize);

					case 9:
						res = _context4.sent;
						_context4.next = 12;
						return Article.find(q, function (err, art) {
							return art;
						});

					case 12:
						total = _context4.sent;
						totalLenth = total.length;
						resArr = res.map(function (item) {
							return {
								Aid: item.Aid,
								createTime: item.createTime,
								title: item.title,
								type: item.type
							};
						});

						ctx.status = 200;
						ctx.body = {
							code: 0,
							list: resArr,
							total: totalLenth
						};
						_context4.next = 21;
						break;

					case 19:
						ctx.status = 200;
						ctx.body = {
							code: -999,
							errorMsg: '当前未登录，请重新登录'
						};

					case 21:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, this);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}());

// 查询详情
router.post('/articleDetail', function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee5(ctx, next) {
		var req, res;
		return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						req = ctx.request.body;
						// 定义查询条件

						_context5.next = 3;
						return Article.find({ Aid: req.Aid }, function (err, art) {
							return art;
						});

					case 3:
						res = _context5.sent;

						if (res && res.length > 0) {
							ctx.status = 200;
							ctx.body = {
								code: 0,
								article: res[0]
							};
						} else {
							ctx.status = 200;
							ctx.body = {
								code: -1,
								errorMsg: '查询失败'
							};
						}

					case 5:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, this);
	}));

	return function (_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}());

//删除文章
router.post('/delArticles', function () {
	var _ref6 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee6(ctx, next) {
		var req, loginSessionId, res;
		return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						req = ctx.request.body;
						_context6.next = 3;
						return redis.get('loginSessionId', function (err, result) {
							return result;
						});

					case 3:
						loginSessionId = _context6.sent;

						if (!(req.loginSessionId && req.loginSessionId === loginSessionId)) {
							_context6.next = 11;
							break;
						}

						_context6.next = 7;
						return Article.remove({ Aid: req.Aid }, function (err, art) {
							return art;
						});

					case 7:
						res = _context6.sent;

						if (res.ok == 1) {
							ctx.status = 200;
							ctx.body = {
								code: 0,
								errorMsg: '删除成功'
							};
						} else {
							ctx.status = 200;
							ctx.body = {
								code: -1,
								errorMsg: '删除失败'
							};
						}

						_context6.next = 13;
						break;

					case 11:
						ctx.status = 200;
						ctx.body = {
							code: -999,
							errorMsg: '当前未登录，请重新登录'
						};

					case 13:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, this);
	}));

	return function (_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
}());

module.exports = router;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator__);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = __webpack_require__(3);
var Redis = __webpack_require__(2);
var redis = new Redis();
var mongoose = __webpack_require__(0);
// 引入 mongoose 配置文件
var Comment = mongoose.model('Comment');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo success');
});
var router = new Router();

router.post('/setComment', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var req, nowTime, comment, saveerr;
    return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = ctx.request.body;
            nowTime = new Date();
            comment = new Comment({
              bindAid: req.bindAid,
              createTime: nowTime,
              text: req.text,
              name: req.name
            });
            saveerr = comment.save(function (err, bobo) {
              if (err) return console.error(err);
            });

            if (saveerr) {
              ctx.status = 200;
              ctx.body = {
                code: -1,
                errorMsg: saveerr
              };
            } else {
              ctx.status = 200;
              ctx.body = {
                code: 0,
                errorMsg: '评论成功'
              };
            }

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/getComments', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    var req, res, resArr;
    return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = ctx.request.body;
            _context2.next = 3;
            return Comment.find({ bindAid: req.bindAid }, function (err, art) {
              return art;
            }).sort({ createTime: -1 });

          case 3:
            res = _context2.sent;
            resArr = res.map(function (item) {
              return {
                createTime: item.createTime,
                text: item.text,
                name: item.name
              };
            });

            ctx.status = 200;
            ctx.body = resArr;

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.post('/queryComments', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
    var req, q, pattern, res, total, totalLenth, resArr;
    return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req = ctx.request.body;
            q = {};

            if (req.name) {
              //如果有搜索请求就增加查询条件
              //用正则表达式得到的pattern对title属性进行模糊查询
              //这里是搜集合里title属性包含str串的所有结果
              pattern = new RegExp("^.*" + req.name + ".*$");

              q.name = pattern;
            }
            _context3.next = 5;
            return Comment.find(q, function (err, art) {
              return art;
            }).sort({ createTime: -1 }).skip((req.pageIndex - 1) * req.pageSize).limit(req.pageSize);

          case 5:
            res = _context3.sent;
            _context3.next = 8;
            return Comment.find(q, function (err, art) {
              return art;
            });

          case 8:
            total = _context3.sent;
            totalLenth = total.length;
            resArr = res.map(function (item) {
              return {
                createTime: item.createTime,
                text: item.text,
                bindAid: item.bindAid,
                name: item.name
              };
            });

            ctx.status = 200;
            ctx.body = {
              code: 0,
              list: resArr,
              total: totalLenth
            };

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

module.exports = router;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator__);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = __webpack_require__(3);
var Redis = __webpack_require__(2);
var redis = new Redis();
var mongoose = __webpack_require__(0);
var codeList = __webpack_require__(13);
// 引入 mongoose 配置文件
var User = mongoose.model('User');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo success');
});
var router = new Router();

router.post('/userlogin', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var req, loginuser, findUser, loginSessionId;
    return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(ctx.request.body);
            req = ctx.request.body;
            _context.next = 4;
            return User.find({ "userName": req.userName }, function (err, users) {
              return users;
            });

          case 4:
            loginuser = _context.sent;

            if (!(loginuser && loginuser.length > 0)) {
              _context.next = 21;
              break;
            }

            findUser = loginuser[0];

            if (!(findUser.passWord === req.passWord)) {
              _context.next = 17;
              break;
            }

            redis.set('loginSessionId', findUser.uid);
            _context.next = 11;
            return redis.get('loginSessionId', function (err, result) {
              return result;
            });

          case 11:
            loginSessionId = _context.sent;

            console.log(loginSessionId);
            ctx.status = 200;
            ctx.body = {
              code: 0,
              errorMsg: null,
              loginSessionId: findUser.uid,
              userName: findUser.userName,
              codeList: codeList.default
            };
            _context.next = 19;
            break;

          case 17:
            ctx.status = 200;
            ctx.body = {
              code: -1,
              errorMsg: '密码错误'
            };

          case 19:
            _context.next = 23;
            break;

          case 21:
            ctx.status = 200;
            ctx.body = {
              code: -1,
              errorMsg: '用户不存在'
            };

          case 23:
            console.log(loginuser);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/getusers', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(ctx.request);
            ctx.status = 200;
            redis.set('hello', 'this is hello');
            _context2.next = 5;
            return redis.get('hello', function (err, result) {
              return result;
            });

          case 5:
            ctx.body = _context2.sent;

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.post('/getCodeList', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
    return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (ctx.request.header.connection != 'close') {
              ctx.status = 200;
              ctx.body = {
                code: 0,
                codeList: codeList.default
              };
            }

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

module.exports = router;

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("koa2-cors");

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codeList = {
	articleTypeList: [{
		codeKey: 'live',
		codeName: '生活'
	}, {
		codeKey: 'javaScript',
		codeName: 'javaScript'
	}, {
		codeKey: 'book',
		codeName: '书籍'
	}]
};
/* harmony default export */ exports["default"] = codeList;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

var ArticleSchema = new mongoose.Schema({
	Aid: Number,
	title: String,
	innerHtml: String,
	createTime: Date,
	type: String
});

mongoose.model('Article', ArticleSchema);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

var CommentSchema = new mongoose.Schema({
	bindAid: Number,
	createTime: Date,
	text: String,
	name: String
});

mongoose.model('Comment', CommentSchema);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

var UserSchema = new mongoose.Schema({
	uid: String,
	userName: String,
	createTime: Date,
	lastLogin: Date,
	passWord: String
});

mongoose.model('User', UserSchema);

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
    var _this = this;

    var app, port, config, nuxt, builder, startRender;
    return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();

            app.use(bodyParser());
            //配置跨域请求
            app.use(cors({
              origin: function origin(ctx) {
                return '*';
              }
            }));

            // const host = process.env.HOST || '127.0.0.1'
            port = process.env.PORT || 80;

            // Import and Set Nuxt.js options

            config = __webpack_require__(4);

            config.dev = !(app.env === 'production');

            // Instantiate nuxt.js
            nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

            // Build in development

            if (!config.dev) {
              _context2.next = 11;
              break;
            }

            builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
            _context2.next = 11;
            return builder.build();

          case 11:
            startRender = function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0_C_my_blog_blog_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return next();

                      case 2:
                        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                          ctx.res.on('close', resolve);
                          ctx.res.on('finish', resolve);
                          nuxt.render(ctx.req, ctx.res, function (promise) {
                            // nuxt.render passes a rejected promise into callback on error.
                            promise.then(resolve).catch(reject);
                          });
                        }));

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function startRender(_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }();

            app.use(users.routes());
            app.use(articles.routes());
            app.use(comments.routes());
            app.use(startRender);

            app.listen(port);
            console.log('Server listening on ' + ':' + port); // eslint-disable-line no-console

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



var cors = __webpack_require__(11);
var bodyParser = __webpack_require__(10);
// 引入 mongoose 配置文件
var mongoose = __webpack_require__(5);
// 执行配置文件中的函数，以实现数据库的配置和 Model 的创建等
var db = mongoose();

//获取user路由
var users = __webpack_require__(8);
var articles = __webpack_require__(6);
var comments = __webpack_require__(7);


start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map