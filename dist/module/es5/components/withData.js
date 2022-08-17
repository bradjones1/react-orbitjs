"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withData;

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _react = require("react");

var _dataStoreShape = _interopRequireDefault(require("../utils/dataStoreShape"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultMapRecordsToProps = {};

var defaultMergeProps = function defaultMergeProps(recordProps, parentProps) {
  return _objectSpread(_objectSpread({}, parentProps), recordProps);
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withData(mapRecordsToProps, mergeProps) {
  var shouldSubscribe = Boolean(mapRecordsToProps);
  var mapRecords = mapRecordsToProps || defaultMapRecordsToProps;
  var finalMergeProps = mergeProps || defaultMergeProps;
  return function wrapWithConnect(WrappedComponent) {
    var componentDisplayName = "WithData(".concat(getDisplayName(WrappedComponent), ")");

    function computeMergedProps(stateProps, parentProps) {
      return finalMergeProps(stateProps, parentProps);
    }

    var WithData = /*#__PURE__*/function (_Component) {
      _inherits(WithData, _Component);

      var _super = _createSuper(WithData);

      function WithData(_props, context) {
        var _this;

        _classCallCheck(this, WithData);

        _this = _super.call(this, _props, context);

        _defineProperty(_assertThisInitialized(_this), "makeReducePropsToRecords", function (dataStore, recordQueries) {
          return function (recordProps, prop) {
            var result;

            try {
              result = dataStore.cache.query(recordQueries[prop]);
            } catch (error) {
              console.warn(error.message);
              result = undefined;
            }

            return _objectSpread(_objectSpread({}, recordProps), {}, _defineProperty({}, prop, result));
          };
        });

        _defineProperty(_assertThisInitialized(_this), "computeChangedRecordProps", function (selectedRecordProps, dataStore, props) {
          return _this.selectivelyComputeRecordProps(selectedRecordProps, dataStore, props);
        });

        _defineProperty(_assertThisInitialized(_this), "computeAllRecordProps", function (dataStore, props) {
          return _this.selectivelyComputeRecordProps(true, dataStore, props);
        });

        _defineProperty(_assertThisInitialized(_this), "computeChangedQueryProps", function (dataStore, props) {
          var recordQueries = _this.getRecordQueries(dataStore, props);

          var recordProps = _this.expressionChangedProps.reduce(_this.makeReducePropsToRecords(dataStore, recordQueries), {});

          return recordProps;
        });

        _defineProperty(_assertThisInitialized(_this), "selectivelyComputeRecordProps", function (selectedRecordPropsOrAll, dataStore, props) {
          var recordQueries;

          if (selectedRecordPropsOrAll === true || selectedRecordPropsOrAll.length) {
            recordQueries = _this.getRecordQueries(dataStore, props);
          }

          if (selectedRecordPropsOrAll === true) {
            selectedRecordPropsOrAll = Object.keys(recordQueries);
          }

          var recordProps = selectedRecordPropsOrAll.reduce(_this.makeReducePropsToRecords(dataStore, recordQueries), {});
          return recordProps;
        });

        _defineProperty(_assertThisInitialized(_this), "getConvenienceProps", function (dataStore) {
          if (!_this.convenienceProps) {
            _this.convenienceProps = {
              dataStore: dataStore,
              queryStore: function queryStore() {
                return dataStore.query.apply(dataStore, arguments);
              },
              updateStore: function updateStore() {
                return dataStore.update.apply(dataStore, arguments);
              }
            };
          }

          return _this.convenienceProps;
        });

        _defineProperty(_assertThisInitialized(_this), "getRecordQueries", function (dataStore, props) {
          if (!_this.mapRecordsIsConfigured || _this.doRecordPropsDependOnOwnProps && _this.haveOwnPropsChanged) {
            return _this.configureMapRecords(dataStore, props);
          }

          return _this.mapRecordsGivenOwnProps(props);
        });

        _defineProperty(_assertThisInitialized(_this), "mapRecordsGivenOwnProps", function (props) {
          return _this.recordPropsIsFunction ? mapRecords(props) : mapRecords;
        });

        _defineProperty(_assertThisInitialized(_this), "configureMapRecords", function (dataStore, props) {
          _this.recordPropsIsFunction = typeof mapRecords === 'function';
          _this.doRecordPropsDependOnOwnProps = _this.recordPropsIsFunction && mapRecords.length > 0;
          _this.mapRecordsIsConfigured = true;

          var recordQueries = _this.mapRecordsGivenOwnProps(props);

          var recordQueryKeys = Object.keys(recordQueries);
          var currentExpressions = {}; // Reset subscribedModels so mapRecordsToProps can return different keys with each update
          // and we don't listen for stale record props.

          _this.subscribedModels = {};
          recordQueryKeys.forEach(function (prop) {
            return _this.subscribedModels[prop] = [];
          }); // Iterate all queries, to make a list of models to listen for

          recordQueryKeys.forEach(function (prop) {
            var expression = recordQueries[prop](dataStore.queryBuilder).toQueryExpression();

            switch (expression.op) {
              case 'findRecord':
                _this.subscribedModels[prop].push(expression.record.type);

                break;

              case 'findRecords':
                _this.subscribedModels[prop].push(expression.type);

                break;

              case 'findRelatedRecord':
              case 'findRelatedRecords':
                _this.subscribedModels[prop].push(expression.record.type);

                _this.subscribedModels[prop].push(_this.dataStore.schema.models[expression.record.type].relationships[expression.relationship].model || _this.dataStore.schema.models[expression.record.type].relationships[expression.relationship].type);

            }

            currentExpressions[prop] = expression;
          });
          recordQueryKeys.forEach(function (prop) {
            _this.subscribedModels[prop] = _this.subscribedModels[prop].filter(function (value, index, self) {
              return self.indexOf(value) === index;
            });
          }); // Update expressionChangedProps by diffing lastExpressions with expressions

          recordQueryKeys.forEach(function (prop) {
            if (typeof _this.lastExpressions[prop] === 'undefined' || JSON.stringify(currentExpressions[prop]) !== JSON.stringify(_this.lastExpressions[prop])) {
              _this.expressionChangedProps.push(prop);
            }
          });
          _this.lastExpressions = currentExpressions;
          return recordQueries;
        });

        _defineProperty(_assertThisInitialized(_this), "updateRecordPropsIfNeeded", function () {
          var nextRecordProps = {};

          if (_this.recordProps === null) {
            nextRecordProps = _objectSpread(_objectSpread({}, _this.getConvenienceProps(_this.dataStore)), _this.computeAllRecordProps(_this.dataStore, _this.props));
          } else if (_this.haveOwnPropsChanged && _this.doRecordPropsDependOnOwnProps) {
            nextRecordProps = _objectSpread(_objectSpread({}, _this.recordProps), _this.computeChangedQueryProps(_this.dataStore, _this.props)); // Remove all props no longer returned from mapRecordsToProps

            var recordQueryKeys = Object.keys(_this.subscribedModels);
            var conveniencePropKeys = Object.keys(_this.getConvenienceProps(_this.dataStore));
            Object.keys(_this.recordProps).filter(function (key) {
              return !recordQueryKeys.includes(key) && !conveniencePropKeys.includes(key);
            }).forEach(function (key) {
              return delete nextRecordProps[key];
            });
          } else {
            nextRecordProps = _objectSpread(_objectSpread({}, _this.recordProps), _this.computeChangedRecordProps(_this.dataStoreChangedProps, _this.dataStore, _this.props));
          }

          if (_this.recordProps && (0, _shallowEqual.default)(nextRecordProps, _this.recordProps)) {
            return false;
          }

          _this.recordProps = nextRecordProps;
          return true;
        });

        _defineProperty(_assertThisInitialized(_this), "updateMergedPropsIfNeeded", function () {
          var nextMergedProps = computeMergedProps(_this.recordProps, _this.props);

          if (_this.mergedProps && (0, _shallowEqual.default)(nextMergedProps, _this.mergedProps)) {
            return false;
          }

          _this.mergedProps = nextMergedProps;
          return true;
        });

        _defineProperty(_assertThisInitialized(_this), "trySubscribe", function () {
          if (shouldSubscribe && !_this.isListening) {
            _this.isListening = true;

            _this.dataStore.on('transform', _this.handleTransform);
          }
        });

        _defineProperty(_assertThisInitialized(_this), "tryUnsubscribe", function () {
          if (_this.isListening) {
            _this.isListening = null;

            _this.dataStore.off('transform', _this.handleTransform);
          }
        });

        _defineProperty(_assertThisInitialized(_this), "clearCache", function () {
          _this.convenienceProps = null;
          _this.recordProps = null;
          _this.mergedProps = null;
          _this.haveOwnPropsChanged = true;
          _this.dataStoreChangedProps = [];
          _this.expressionChangedProps = [];
          _this.hasDataStoreChanged = true;
          _this.renderedElement = null;
          _this.mapRecordsIsConfigured = false;
          _this.lastExpressions = {};
          _this.subscribedModels = {};
        });

        _defineProperty(_assertThisInitialized(_this), "handleTransform", function (transform) {
          if (!_this.isListening) {
            return;
          }

          var operations = Array.isArray(transform.operations) ? transform.operations : [transform.operations]; // Iterate all transforms, to see if any of those matches a model in the list of queries

          var operationModels = [];
          operations.forEach(function (operation) {
            switch (operation.op) {
              case 'addRecord':
              case 'replaceRecord':
              case 'updateRecord':
                // operation.record may contains some relationships, in this case
                // its inverse relationships are modified too, we add them to operationModels.
                operationModels.push(operation.record.type);
                if (operation.record.relationships === undefined) break;
                Object.keys(operation.record.relationships).forEach(function (relationship) {
                  operationModels.push(_this.dataStore.schema.models[operation.record.type].relationships[relationship].model || _this.dataStore.schema.models[operation.record.type].relationships[relationship].type);
                });
                break;

              case 'removeRecord':
                // If the removed record had some relationships, inverse relationships
                // are modified too. As operation.record does not contain any relationships
                // we have to assume that all its inverse relationships defined
                // in the schema could be impacted and must be added to operationModels.
                operationModels.push(operation.record.type);
                var relationships = _this.dataStore.schema.models[operation.record.type].relationships;
                Object.keys(relationships).map(function (k) {
                  return relationships[k];
                }).forEach(function (relationship) {
                  operationModels.push(relationship.model || relationship.type);
                });
                break;

              case 'replaceKey':
              case 'replaceAttribute':
                operationModels.push(operation.record.type);
                break;

              case 'addToRelatedRecords':
              case 'removeFromRelatedRecords':
              case 'replaceRelatedRecord':
                // Add both record and relatedRecord to operationModels, because
                // it can modify both its relationships and inverse relationships.
                operationModels.push(operation.record.type);
                operationModels.push(_this.dataStore.schema.models[operation.record.type].relationships[operation.relationship].model || _this.dataStore.schema.models[operation.record.type].relationships[operation.relationship].type);
                break;

              case 'replaceRelatedRecords':
                operationModels.push(operation.record.type);
                operation.relatedRecords.forEach(function (relatedRecord) {
                  operationModels.push(relatedRecord.type);
                });
                break;

              default:
                console.warn('This transform operation is not supported in react-orbitjs.');
            }
          });
          var uniqueOperationModels = new Set(operationModels);
          uniqueOperationModels.forEach(function (model) {
            Object.keys(_this.subscribedModels).forEach(function (prop) {
              if (_this.subscribedModels[prop].includes(model)) {
                _this.hasDataStoreChanged = true;

                _this.dataStoreChangedProps.push(prop);
              }
            });
          });

          _this.forceUpdate();
        });

        _this.dataStore = _props.dataStore || context.dataStore;

        if (!_this.dataStore) {
          throw new Error("Could not find \"dataStore\" in either the context or " + "props of \"".concat(componentDisplayName, "\". ") + "Either wrap the root component in a <DataProvider>, " + "or explicitly pass \"dataStore\" as a prop to \"".concat(componentDisplayName, "\"."));
        } // const storeState = this.dataStore.getState()
        // this.state = {storeState}


        _this.clearCache();

        return _this;
      }

      _createClass(WithData, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate() {
          return this.haveOwnPropsChanged || this.hasDataStoreChanged;
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.trySubscribe();
        }
      }, {
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(nextProps) {
          if (!(0, _shallowEqual.default)(nextProps, this.props)) {
            this.haveOwnPropsChanged = true;
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.tryUnsubscribe();
          this.clearCache();
        }
      }, {
        key: "render",
        value: function render() {
          var haveOwnPropsChanged = this.haveOwnPropsChanged,
              hasDataStoreChanged = this.hasDataStoreChanged,
              renderedElement = this.renderedElement;
          var shouldUpdateRecordProps = true;

          if (renderedElement) {
            shouldUpdateRecordProps = hasDataStoreChanged || haveOwnPropsChanged && this.doRecordPropsDependOnOwnProps;
          }

          var haveRecordPropsChanged = false;

          if (shouldUpdateRecordProps) {
            haveRecordPropsChanged = this.updateRecordPropsIfNeeded();
          }

          this.haveOwnPropsChanged = false;
          this.hasDataStoreChanged = false;
          this.dataStoreChangedProps = [];
          this.expressionChangedProps = [];
          var haveMergedPropsChanged = true;

          if (haveRecordPropsChanged || haveOwnPropsChanged) {
            haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
          } else {
            haveMergedPropsChanged = false;
          }

          if (!haveMergedPropsChanged && renderedElement) {
            return renderedElement;
          }

          this.renderedElement = /*#__PURE__*/(0, _react.createElement)(WrappedComponent, this.mergedProps);
          return this.renderedElement;
        }
      }]);

      return WithData;
    }(_react.Component);

    WithData.displayName = componentDisplayName;
    WithData.WrappedComponent = WrappedComponent;
    WithData.contextTypes = {
      dataStore: _dataStoreShape.default
    };
    WithData.propTypes = {
      dataStore: _dataStoreShape.default
    };
    return (0, _hoistNonReactStatics.default)(WithData, WrappedComponent);
  };
}