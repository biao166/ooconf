'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _fs = require('./fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')(_package2.default.name + ':local');

var Load = function () {
  function Load(store, opts) {
    (0, _classCallCheck3.default)(this, Load);

    this.env = opts.env;
    this.dir = opts.dir;
    this.store = store;
  }

  (0, _createClass3.default)(Load, [{
    key: 'load',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var results, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, conf;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                debug(this);
                results = {};
                _context.prev = 2;
                _context.next = 5;
                return _fs2.default.readdirAsync(this.dir);

              case 5:
                files = _context.sent;

                files = files.filter(this.filter);

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 10;
                _iterator = (0, _getIterator3.default)(files);

              case 12:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 22;
                  break;
                }

                file = _step.value;
                _context.next = 16;
                return this.loadFile(file);

              case 16:
                conf = _context.sent;

                debug(file, conf);
                results[conf.name] = this.parse(conf.data);

              case 19:
                _iteratorNormalCompletion = true;
                _context.next = 12;
                break;

              case 22:
                _context.next = 28;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context['catch'](10);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 28:
                _context.prev = 28;
                _context.prev = 29;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 31:
                _context.prev = 31;

                if (!_didIteratorError) {
                  _context.next = 34;
                  break;
                }

                throw _iteratorError;

              case 34:
                return _context.finish(31);

              case 35:
                return _context.finish(28);

              case 36:
                _context.next = 41;
                break;

              case 38:
                _context.prev = 38;
                _context.t1 = _context['catch'](2);

                console.error(_package2.default.name, _context.t1);

              case 41:

                this.store.set(results);

              case 42:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 38], [10, 24, 28, 36], [29,, 31, 35]]);
      }));

      function load() {
        return _ref.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: 'filter',
    value: function filter(file) {
      var fileTypeRegex = new RegExp('.(' + ['json', 'js'].join('|') + ')$', 'i');
      return fileTypeRegex.test(file);
    }
  }, {
    key: 'loadFile',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(file) {
        var ref, data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ref = _path2.default.parse(file);

                // TODO 配置文件全部json化

                data = require(_path2.default.join(this.dir, file));
                return _context2.abrupt('return', {
                  name: ref.name.toLowerCase().replace(/\./g, '_'),
                  extension: ref.ext.toLowerCase(),
                  data: data
                });

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadFile(_x) {
        return _ref2.apply(this, arguments);
      }

      return loadFile;
    }()
  }, {
    key: 'parse',
    value: function parse(conf) {
      var envDefault = conf['default'];
      var envConf = conf[this.env];

      if (!envDefault && !envConf) {
        return conf;
      }
      return (0, _assign2.default)({}, envDefault || {}, envConf || {});
    }
  }]);
  return Load;
}();

exports.default = Load;