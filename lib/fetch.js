'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _cron = require('cron');

var _cron2 = _interopRequireDefault(_cron);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _formats = require('./formats');

var _formats2 = _interopRequireDefault(_formats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')(_package2.default.name + ':fetch');

var Fetch = function () {
  function Fetch(store, opts) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Fetch);

    if (typeof opts === 'string') {
      this.url = opts;
    } else {
      this.url = _url2.default.format({
        hostname: opts.host || opts.hostname,
        port: opts.port || 80,
        pathname: opts.pathname || opts.path,
        protocol: opts.protocol || 'http'
      });
    }

    this.parse = opts.parse;

    if (opts.cronTime) {
      this.job = new _cron2.default.CronJob({
        cronTime: opts.cronTime,
        onTick: function onTick() {
          _this.fetch();
          console.log(_package2.default.name + ' fetch job ticked at ' + new Date());
        },
        start: false
      });
    }

    this.store = store;
  }

  (0, _createClass3.default)(Fetch, [{
    key: 'fetch',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var conf;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                debug('fetch');
                conf = {};
                _context.prev = 2;
                _context.next = 5;
                return this.fetchConf(this.url).then(_formats2.default.parse).then(this.validate).then(this.parse);

              case 5:
                conf = _context.sent;
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](2);

                // TODO handle error
                console.error(_package2.default.name, _context.t0);

              case 11:

                this.store.set(conf);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 8]]);
      }));

      function fetch() {
        return _ref.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: 'fetchConf',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url) {
        var options;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = {
                  url: url,
                  timeout: 5000,
                  headers: {
                    'Connection': 'close',
                    'Cache-control': 'max-age=0'
                  }
                };
                return _context2.abrupt('return', new _bluebird2.default(function (resolve, reject) {
                  (0, _request2.default)(options, function (err, response, body) {
                    if (!err && response.statusCode == 200) {
                      resolve(body);
                    } else if (!err && response.statusCode == 404) {
                      reject(new Error('404 NOT FOUND'));
                    } else {
                      reject(err);
                    }
                  });
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchConf(_x) {
        return _ref2.apply(this, arguments);
      }

      return fetchConf;
    }()
  }, {
    key: 'validate',
    value: function validate(conf) {
      // TODO validate remote
      return conf;
    }
  }]);
  return Fetch;
}();

exports.default = Fetch;