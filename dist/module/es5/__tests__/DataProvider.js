"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _index = require("../index");

var _dataStoreShape = _interopRequireDefault(require("../utils/dataStoreShape"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getOrbitSchemaAndSto = (0, _utils.getOrbitSchemaAndStore)({}),
    memory = _getOrbitSchemaAndSto.memory;

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