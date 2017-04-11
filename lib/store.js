'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _gracefulFs = require('graceful-fs');

var _gracefulFs2 = _interopRequireDefault(_gracefulFs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _xdgBasedir = require('xdg-basedir');

var _xdgBasedir2 = _interopRequireDefault(_xdgBasedir);

var _writeFileAtomic = require('write-file-atomic');

var _writeFileAtomic2 = _interopRequireDefault(_writeFileAtomic);

var _dotProp = require('dot-prop');

var _dotProp2 = _interopRequireDefault(_dotProp);

var _uniqueString = require('unique-string');

var _uniqueString2 = _interopRequireDefault(_uniqueString);

var _formats = require('./formats');

var _formats2 = _interopRequireDefault(_formats);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')(_package2.default.name + ':store');

var configDir = _xdgBasedir2.default.config || _path2.default.join(_os2.default.tmpdir(), (0, _uniqueString2.default)());
var permissionError = 'You don\'t have access to this file.';
var defaultPathMode = 448;
var writeFileOptions = {
  mode: 384
};

var getByWeight = function getByWeight(conf) {
  if (!Array.isArray(conf)) {
    return conf;
  }

  if (conf.length === 1) {
    return conf[0];
  }

  var weight = 0;

  conf.forEach(function (item) {
    item.weight = item.weight || 1;
    weight += item.weight;
  });

  var random = Math.floor(Math.random() * weight) + 1;
  weight = 0;

  return _.find(conf, function (item) {
    weight += item.weight;

    if (random <= weight) {
      delete item.weight;
      return item;
    }
  });
};

var Store = function () {
  function Store(id, defaults, opts) {
    (0, _classCallCheck3.default)(this, Store);

    opts = opts || {};

    var pathPrefix = opts.globalConfigPath ? _path2.default.join(id, 'config.json') : _path2.default.join(_package2.default.name, id + '.json');

    this.path = _path2.default.join(configDir, pathPrefix);
    this.all = (0, _assign2.default)({}, defaults, this.all);
  }

  (0, _createClass3.default)(Store, [{
    key: 'get',
    value: function get(key) {
      var data = _dotProp2.default.get(this.all, key);
      return getByWeight(data);
    }
  }, {
    key: 'set',
    value: function set(key, val) {
      debug('set', key, val);

      var config = this.all;

      if (arguments.length === 1) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(key)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            _dotProp2.default.set(config, k, key[k]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        _dotProp2.default.set(config, key, val);
      }

      this.all = config;
    }
  }, {
    key: 'has',
    value: function has(key) {
      return _dotProp2.default.has(this.all, key);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      debug('del', key);
      var config = this.all;
      _dotProp2.default.delete(config, key);
      this.all = config;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.all = {};
    }
  }, {
    key: 'all',
    get: function get() {
      try {
        return _formats2.default.parse(_gracefulFs2.default.readFileSync(this.path, 'utf8'));
      } catch (err) {
        if (err.code === 'ENOENT') {
          _mkdirp2.default.sync(_path2.default.dirname(this.path), defaultPathMode);
          return {};
        }

        if (err.code === 'EACCES') {
          err.message = err.message + '\n' + permissionError + '\n';
        }

        if (err.name === 'SyntaxError') {
          _writeFileAtomic2.default.sync(this.path, '', writeFileOptions);
          return {};
        }

        throw err;
      }
    },
    set: function set(val) {
      try {
        _mkdirp2.default.sync(_path2.default.dirname(this.path), defaultPathMode);

        _writeFileAtomic2.default.sync(this.path, _formats2.default.stringify(val), writeFileOptions);
      } catch (err) {
        if (err.code === 'EACCES') {
          err.message = err.message + '\n' + permissionError + '\n';
        }

        throw err;
      }
    }
  }, {
    key: 'size',
    get: function get() {
      return (0, _keys2.default)(this.all || {}).length;
    }
  }]);
  return Store;
}();

exports.default = Store;