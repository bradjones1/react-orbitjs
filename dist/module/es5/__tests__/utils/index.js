"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrbitSchemaAndStore = getOrbitSchemaAndStore;
exports.getOrbitVersion = getOrbitVersion;

var Data = _interopRequireWildcard(require("@orbit/data"));

var Memory = _interopRequireWildcard(require("@orbit/memory"));

var Records = _interopRequireWildcard(require("@orbit/records"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getOrbitVersion() {
  return typeof Memory.MemorySource === 'undefined' ? 16 : 17;
}

function getOrbitSchemaAndStore(models) {
  if (getOrbitVersion() === 16) {
    // OrbitJs 0.16.x
    var schema = new Data.Schema(models);
    return {
      schema: schema,
      memory: new Memory.default({
        schema: schema
      })
    };
  } else {
    // OrbitJs 0.17.x
    var recordSchema = new Records.RecordSchema(models);
    return {
      schema: recordSchema,
      memory: new Memory.MemorySource({
        schema: recordSchema
      })
    };
  }
}