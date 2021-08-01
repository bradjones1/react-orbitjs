"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _data = require("@orbit/data");

var _memory = _interopRequireDefault(require("@orbit/memory"));

var _index = require("./../index");

var _dataStoreShape = _interopRequireDefault(require("./../utils/dataStoreShape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _data.Schema({});
var memory = new _memory.default({
  schema: schema
});
test("DataProvider renders children", function () {
  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement("span", null, "test children")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test("DataProvider make dataStore available through context", function () {
  var TestContext = function TestContext(props, context) {
    expect(context.dataStore).toBe(memory);
    return /*#__PURE__*/_react.default.createElement("span", null, "test context");
  };

  TestContext.contextTypes = {
    dataStore: _dataStoreShape.default.isRequired
  };

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestContext, null)));
});