'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _load = require('./load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('' + _package2.default.name);

var noop = function noop(data) {
  return data;
};

exports.default = function (id, defaults, opts) {
  debug(id, defaults, opts);

  var store = new _store2.default(id, defaults, opts);
  store.set(defaults);

  var load = void 0;
  if (opts.dir && opts.env) {
    load = new _load2.default(store, {
      dir: opts.dir,
      env: opts.env
    });
  }

  var fetch = void 0;
  if (opts.remote) {
    fetch = new _fetch2.default(store, (0, _extends3.default)({
      cronTime: opts.cronTime,
      parse: opts.parse || noop
    }, opts.remote));
  }

  store.start = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!load) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return load.load();

          case 3:
            if (!fetch) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return fetch.fetch();

          case 6:
            fetch.job && fetch.job.start();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return store;
};