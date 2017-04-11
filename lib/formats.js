"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  stringify: function stringify(obj, replacer, spacing) {
    return (0, _stringify2.default)(obj, replacer || null, spacing || 2);
  },

  parse: JSON.parse
};