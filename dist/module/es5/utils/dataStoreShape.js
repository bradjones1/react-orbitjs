"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _propTypes.default.shape({
  query: _propTypes.default.func.isRequired,
  on: _propTypes.default.func.isRequired,
  cache: _propTypes.default.object.isRequired,
  schema: _propTypes.default.object.isRequired
});

exports.default = _default;