"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _index = require("../index");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Unfortunately, on Windows we can't use async/await for tests
// see https://github.com/facebook/jest/issues/3750 for more info
var definition = (0, _utils.getOrbitVersion)() === 16 ? {
  models: {
    list: {
      attributes: {
        name: {
          type: 'string'
        }
      },
      relationships: {
        owner: {
          type: 'hasOne',
          model: 'user',
          inverse: 'lists'
        },
        todos: {
          type: 'hasMany',
          model: 'todo',
          inverse: 'list'
        }
      }
    },
    todo: {
      attributes: {
        description: {
          type: 'string'
        }
      },
      relationships: {
        list: {
          type: 'hasOne',
          model: 'list',
          inverse: 'todos'
        },
        owner: {
          type: 'hasOne',
          model: 'user',
          inverse: 'todos'
        }
      }
    },
    user: {
      attributes: {
        name: {
          type: 'string'
        }
      },
      relationships: {
        lists: {
          type: 'hasMany',
          model: 'list',
          inverse: 'owner'
        },
        todos: {
          type: 'hasMany',
          model: 'todo',
          inverse: 'owner'
        }
      }
    }
  }
} : {
  models: {
    list: {
      attributes: {
        name: {
          type: 'string'
        }
      },
      relationships: {
        owner: {
          kind: 'hasOne',
          type: 'user',
          inverse: 'lists'
        },
        todos: {
          kind: 'hasMany',
          type: 'todo',
          inverse: 'list'
        }
      }
    },
    todo: {
      attributes: {
        description: {
          type: 'string'
        }
      },
      relationships: {
        list: {
          kind: 'hasOne',
          type: 'list',
          inverse: 'todos'
        },
        owner: {
          kind: 'hasOne',
          type: 'user',
          inverse: 'todos'
        }
      }
    },
    user: {
      attributes: {
        name: {
          type: 'string'
        }
      },
      relationships: {
        lists: {
          kind: 'hasMany',
          type: 'list',
          inverse: 'owner'
        },
        todos: {
          kind: 'hasMany',
          type: 'todo',
          inverse: 'owner'
        }
      }
    }
  }
};
var schema;
var memory;
beforeEach(function () {
  var orbitSchemaAndStore = (0, _utils.getOrbitSchemaAndStore)(_objectSpread({}, definition));
  schema = orbitSchemaAndStore.schema;
  memory = orbitSchemaAndStore.memory;
});
afterEach(function () {// ...
}); // This will output a message to the console (Consider adding an error boundary
// to your tree to customize error handling behavior.)

test('withData requires a dataStore', function () {
  var Test = function Test() {
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var TestWithData = (0, _index.withData)()(Test);
  expect(function () {
    _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(TestWithData, null));
  }).toThrow();
});
test('withData renders children with no arguments', function () {
  var Test = function Test() {
    return /*#__PURE__*/_react.default.createElement("span", null, "test withdata");
  };

  var TestWithData = (0, _index.withData)()(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('withData renders children with empty object', function () {
  var Test = function Test() {
    return /*#__PURE__*/_react.default.createElement("span", null, "test withdata");
  };

  var TestWithData = (0, _index.withData)({})(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('withData renders children with function returning empty object', function () {
  var Test = function Test() {
    return /*#__PURE__*/_react.default.createElement("span", null, "test withdata");
  };

  var TestWithData = (0, _index.withData)(function () {
    return {};
  })(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('withData passes down own props', function () {
  var Test = function Test(_ref) {
    var test = _ref.test;
    return /*#__PURE__*/_react.default.createElement("span", null, test);
  };

  var TestWithData = (0, _index.withData)()(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, {
    test: "test"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('withData subscribes and unsubscribes from store event', function () {
  var Test = function Test() {
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var mapRecordsToProps = {
    todos: function todos(q) {
      return q.findRecords('todo');
    }
  };
  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
  expect(memory.listeners('transform')).toHaveLength(0);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

  expect(memory.listeners('transform')).toHaveLength(1);
  component.unmount();
  expect(memory.listeners('transform')).toHaveLength(0);
});
test('withData passes records as prop', function () {
  var Test = function Test(_ref2) {
    var todos = _ref2.todos;
    expect(todos).toHaveLength(0);
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var mapRecordsToProps = {
    todos: function todos(q) {
      return q.findRecords('todo');
    }
  };
  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));
});
test('withData passes non-existing record as undefined in findRecord', function () {
  var Test = function Test(_ref3) {
    var todo = _ref3.todo;
    expect(todo).toBeUndefined();
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var mapRecordsToProps = {
    todo: function todo(q) {
      return q.findRecord({
        type: 'todo',
        id: 'non-existing'
      });
    }
  };
  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));
});
test('withData passes non-existing record as empty array in findRecords', function () {
  var Test = function Test(_ref4) {
    var todos = _ref4.todos;
    expect(todos).toHaveLength(0);
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var mapRecordsToProps = {
    todos: function todos(q) {
      return q.findRecords('todo');
    }
  };
  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));
});
test('withData passes dataStore', function () {
  var Test = function Test(_ref5) {
    var dataStore = _ref5.dataStore;
    expect(dataStore).toBe(memory);
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var TestWithData = (0, _index.withData)()(Test);

  _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));
});
test('withData passes queryStore', function () {
  var Test = function Test(_ref6) {
    var queryStore = _ref6.queryStore;
    expect(_typeof(queryStore)).toEqual('function'); // queryStore should return a promise

    expect(_typeof(queryStore(function (q) {
      return q.findRecords('todo');
    }))).toEqual('object');
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var TestWithData = (0, _index.withData)()(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));
});
test('withData passes updateStore', function () {
  var record = {
    type: 'todo',
    id: 'my-first-todo',
    attributes: {
      description: 'Run tests'
    }
  };

  var Test = function Test(_ref7) {
    var updateStore = _ref7.updateStore;
    expect(_typeof(updateStore)).toEqual('function'); // updateStore should return a promise

    expect(_typeof(updateStore(function (t) {
      return t.addRecord(record);
    }))).toEqual('object');
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var TestWithData = (0, _index.withData)()(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));
});
test('withData receives updates for findRecord', function (done) {
  var callCount = 0;
  var record = {
    type: 'todo',
    id: 'my-first-todo',
    attributes: {
      description: 'Run tests'
    }
  };

  var testTodo = function testTodo(todo) {
    if (callCount++ === 1) {
      expect(todo).toEqual(record);
      done();
    }
  };

  var Test = function Test(_ref8) {
    var todo = _ref8.todo;
    testTodo(todo);
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var mapRecordsToProps = {
    todo: function todo(q) {
      return q.findRecord({
        type: 'todo',
        id: 'my-first-todo'
      });
    }
  };
  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

  memory.update(function (t) {
    return t.addRecord(record);
  });
});
test('withData receives updates for findRecords', function (done) {
  var callCount = 0;

  var testTodos = function testTodos(todos) {
    expect(todos).toHaveLength(callCount++);

    if (callCount === 2) {
      done();
    }
  };

  var Test = function Test(_ref9) {
    var todos = _ref9.todos;
    testTodos(todos);
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var mapRecordsToProps = {
    todos: function todos(q) {
      return q.findRecords('todo');
    }
  };
  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

  var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

  memory.update(function (t) {
    return t.addRecord({
      type: 'todo',
      id: 'my-first-todo',
      attributes: {
        description: 'Run tests'
      }
    });
  });
});
test('withData receives updates for findRelatedRecord', function (done) {
  // Unfortunately, on Windows we can't use async/await for tests
  // see https://github.com/facebook/jest/issues/3750 for more info
  var callCount = 0;
  var user = {
    type: 'user',
    id: 'test-user',
    attributes: {
      name: 'Test user'
    }
  };
  var updatedName = 'updated-test-user';
  memory.update(function (t) {
    return t.addRecord(user);
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'my-first-todo',
        attributes: {
          description: 'Run tests'
        }
      });
    });
  }).then(function () {
    var testTodos = function testTodos(owner) {
      callCount++;

      if (callCount === 1) {
        expect(owner).toBeNull();
      } else if (callCount === 2) {
        expect(owner).toMatchObject(user);
      } else if (callCount === 3) {
        expect(owner.attributes.name).toEqual(updatedName);
      } else if (callCount === 4) {
        expect(owner).toBeNull();
        done();
      }
    };

    var Test = function Test(_ref10) {
      var owner = _ref10.owner;
      testTodos(owner);
      return /*#__PURE__*/_react.default.createElement("span", null, "test");
    };

    var mapRecordsToProps = {
      owner: function owner(q) {
        return q.findRelatedRecord({
          type: 'todo',
          id: 'my-first-todo'
        }, 'owner');
      }
    };
    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

    var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

    memory.update(function (t) {
      return t.replaceRelatedRecord({
        type: 'todo',
        id: 'my-first-todo'
      }, 'owner', {
        type: 'user',
        id: 'test-user'
      });
    }).then(function () {
      memory.update(function (t) {
        return t.replaceAttribute({
          type: 'user',
          id: 'test-user'
        }, 'name', updatedName);
      });
    }).then(function () {
      memory.update(function (t) {
        return t.replaceRelatedRecord({
          type: 'todo',
          id: 'my-first-todo'
        }, 'owner', null);
      });
    });
  });
});
test('withData receives updates for findRelatedRecords', function (done) {
  // Unfortunately, on Windows we can't use async/await for tests
  // see https://github.com/facebook/jest/issues/3750 for more info
  var callCount = 0;
  var updatedDescription = 'Run tests again';
  memory.update(function (t) {
    return t.addRecord({
      type: 'user',
      id: 'test-user',
      attributes: {
        name: 'Test user'
      }
    });
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'my-first-todo',
        attributes: {
          description: 'Run tests'
        }
      });
    });
  }).then(function () {
    var testTodos = function testTodos(todos, user) {
      callCount++;

      if (callCount === 1) {
        expect(todos).toHaveLength(0);
      } else if (callCount === 2) {
        expect(todos).toHaveLength(1);
        expect(user.relationships.todos.data).toHaveLength(1);
      } else if (callCount === 3) {
        expect(todos).toHaveLength(1);
        expect(todos[0].attributes.description).toEqual(updatedDescription);
        expect(user.relationships.todos.data).toHaveLength(1);
      } else if (callCount === 4) {
        expect(todos).toHaveLength(0);
        expect(user.relationships.todos.data).toHaveLength(0);
      } else if (callCount === 5) {
        expect(todos).toHaveLength(1);
        expect(user.relationships.todos.data).toHaveLength(1);
      } else if (callCount === 6) {
        expect(todos).toHaveLength(0);
        expect(user.relationships.todos.data).toHaveLength(0);
        done();
      }
    };

    var Test = function Test(_ref11) {
      var todos = _ref11.todos,
          user = _ref11.user;
      testTodos(todos, user);
      return /*#__PURE__*/_react.default.createElement("span", null, "test");
    };

    var mapRecordsToProps = {
      user: function user(q) {
        return q.findRecord({
          type: 'user',
          id: 'test-user'
        });
      },
      todos: function todos(q) {
        return q.findRelatedRecords({
          type: 'user',
          id: 'test-user'
        }, 'todos');
      }
    };
    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

    var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

    memory.update(function (t) {
      return t.addToRelatedRecords({
        type: 'user',
        id: 'test-user'
      }, 'todos', {
        type: 'todo',
        id: 'my-first-todo'
      });
    }).then(function () {
      return memory.update(function (t) {
        return t.replaceAttribute({
          type: 'todo',
          id: 'my-first-todo'
        }, 'description', updatedDescription);
      });
    }).then(function () {
      memory.update(function (t) {
        return t.removeFromRelatedRecords({
          type: 'user',
          id: 'test-user'
        }, 'todos', {
          type: 'todo',
          id: 'my-first-todo'
        });
      });
    }).then(function () {
      memory.update(function (t) {
        return t.addRecord({
          type: 'todo',
          id: 'my-second-todo',
          attributes: {
            description: 'Run more tests'
          },
          relationships: {
            owner: {
              data: {
                type: 'user',
                id: 'test-user'
              }
            }
          }
        });
      });
    }).then(function () {
      memory.update(function (t) {
        return t.removeRecord({
          type: 'todo',
          id: 'my-second-todo'
        });
      });
    });
  });
});
test('withData receives updates for findRelatedRecords when calling addRecord with relationship intersection', function (done) {
  // Unfortunately, on Windows we can't use async/await for tests
  // see https://github.com/facebook/jest/issues/3750 for more info
  var callCount = 0;
  var updatedDescription = 'Run tests again';
  memory.update(function (t) {
    return t.addRecord({
      type: 'user',
      id: 'test-user',
      attributes: {
        name: 'Test user'
      }
    });
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord({
        type: 'list',
        id: 'test-list',
        attributes: {
          name: 'Test list'
        },
        relationships: {
          todos: {
            data: []
          },
          owner: {
            data: {
              type: 'user',
              id: 'test-user'
            }
          }
        }
      });
    });
  }).then(function () {
    var testLists = function testLists(lists) {
      callCount++;

      if (callCount === 1) {
        expect(lists).toHaveLength(1);
        expect(lists[0].relationships.todos.data).toHaveLength(0);
      } else if (callCount === 2) {
        expect(lists).toHaveLength(1);
        expect(lists[0].relationships.todos.data).toHaveLength(1);
        done();
      }
    };

    var Test = function Test(_ref12) {
      var lists = _ref12.lists;
      testLists(lists);
      return /*#__PURE__*/_react.default.createElement("span", null, "test");
    };

    var mapRecordsToProps = {
      lists: function lists(q) {
        return q.findRelatedRecords({
          type: 'user',
          id: 'test-user'
        }, 'lists');
      }
    };
    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

    var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

    memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'test-todo',
        attributes: {
          description: 'Do something'
        },
        relationships: {
          list: {
            data: {
              type: 'list',
              id: 'test-list'
            }
          }
        }
      });
    });
  });
});
test('withData receives updates for multiple keys', function (done) {
  // Unfortunately, on Windows we can't use async/await for tests
  // see https://github.com/facebook/jest/issues/3750 for more info
  var callCount = 0;
  memory.update(function (t) {
    return t.addRecord({
      type: 'user',
      id: 'test-user',
      attributes: {
        name: 'Test user'
      }
    });
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'my-first-todo',
        attributes: {
          description: 'Run tests'
        }
      });
    });
  }).then(function () {
    var testTodos = function testTodos(_ref13) {
      var todos = _ref13.todos,
          users = _ref13.users;
      callCount++;

      if (callCount === 1) {
        expect(todos).toHaveLength(1);
        expect(users).toHaveLength(1);
      } else if (callCount === 2) {
        expect(todos).toHaveLength(2);
        expect(users).toHaveLength(1);
      } else if (callCount === 3) {
        expect(todos).toHaveLength(2);
        expect(users).toHaveLength(2);
        done();
      }
    };

    var Test = function Test(_ref14) {
      var todos = _ref14.todos,
          users = _ref14.users;
      testTodos({
        todos: todos,
        users: users
      });
      return /*#__PURE__*/_react.default.createElement("span", null, "test");
    };

    var mapRecordsToProps = {
      todos: function todos(q) {
        return q.findRecords('todo');
      },
      users: function users(q) {
        return q.findRecords('user');
      }
    };
    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

    var component = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

    memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'my-second-todo',
        attributes: {
          description: 'Run more tests'
        }
      });
    }).then(function () {
      memory.update(function (t) {
        return t.addRecord({
          type: 'user',
          id: 'another-user',
          attributes: {
            name: 'Another user'
          }
        });
      });
    });
  });
});
test('withData keeps references for unchanged props', function (done) {
  memory.update(function (t) {
    return t.addRecord({
      type: 'user',
      id: 'test-user',
      attributes: {
        name: 'Test user'
      }
    });
  }).then(function () {
    var Test = function Test(_ref15) {
      var todos = _ref15.todos,
          users = _ref15.users;
      return /*#__PURE__*/_react.default.createElement("span", null);
    };

    var mapRecordsToProps = {
      todos: function todos(q) {
        return q.findRecords('todo');
      },
      users: function users(q) {
        return q.findRecords('user');
      }
    };
    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

    var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

    var testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.todos).toHaveLength(0);
    expect(testComponent.props.users).toHaveLength(1);
    var previousUsers = testComponent.props.users;
    memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'my-first-todo',
        attributes: {
          description: 'Run tests'
        }
      });
    }).then(function () {
      expect(testComponent.props.todos).toHaveLength(1);
      expect(testComponent.props.users).toHaveLength(1);
      expect(testComponent.props.users).toBe(previousUsers);
      done();
    });
  });
});
test('withData receives updates for findRecord depending on own props', function (done) {
  var record = {
    type: 'user',
    id: 'test-user',
    attributes: {
      name: 'Test user'
    }
  };

  var Test = function Test(_ref16) {
    var user = _ref16.user;
    return /*#__PURE__*/_react.default.createElement("span", null);
  };

  var mapRecordsToProps = function mapRecordsToProps(_ref17) {
    var userId = _ref17.userId;
    return {
      user: function user(q) {
        return q.findRecord({
          type: 'user',
          id: userId
        });
      }
    };
  };

  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);

  var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, {
    userId: "test-user"
  })));

  var testComponent = componentRenderer.root.findByType(Test);
  expect(testComponent.props.user).toBeUndefined();
  memory.update(function (t) {
    return t.addRecord(record);
  }).then(function () {
    expect(testComponent.props.user).toEqual(record);
    done();
  });
});
test('withData receives updates when own props change', function (done) {
  var foo = {
    type: 'user',
    id: 'foo',
    attributes: {
      name: 'Foo user'
    }
  };
  var bar = {
    type: 'user',
    id: 'bar',
    attributes: {
      name: 'Bar user'
    }
  };
  memory.update(function (t) {
    return t.addRecord(foo);
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord(bar);
    });
  }).then(function () {
    var Test = function Test(_ref18) {
      var user = _ref18.user;
      return /*#__PURE__*/_react.default.createElement("span", null);
    };

    var mapRecordsToProps = function mapRecordsToProps(_ref19) {
      var userId = _ref19.userId;
      return {
        user: function user(q) {
          return q.findRecord({
            type: 'user',
            id: userId
          });
        }
      };
    };

    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
    var testComponent;

    var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      userId: "foo"
    })));

    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.user).toEqual(foo);
    componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      userId: "bar"
    })));
    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.user).toEqual(bar);
    done();
  });
});
test("withData doesn't update props if records remain the same", function () {
  var Test = function Test() {
    return /*#__PURE__*/_react.default.createElement("span", null);
  };

  var mapRecordsToProps = function mapRecordsToProps() {
    return {
      users: function users(q) {
        return q.findRecords('user');
      }
    };
  };

  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
  var testComponent;
  var usersProp;

  var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, {
    unusedProp: 1
  })));

  testComponent = componentRenderer.root.findByType(Test);
  expect(testComponent.props.users).toHaveLength(0);
  usersProp = testComponent.props.users;
  componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, {
    unusedProp: 2
  })));
  testComponent = componentRenderer.root.findByType(Test);
  expect(testComponent.props.users).toHaveLength(0);
  expect(testComponent.props.users).toBe(usersProp);
});
test('withData resets all props when mRtP returns an empty object', function (done) {
  var record = {
    type: 'user',
    id: 'test-user',
    attributes: {
      name: 'Test user'
    }
  };
  memory.update(function (t) {
    return t.addRecord(record);
  }).then(function () {
    var Test = function Test() {
      return /*#__PURE__*/_react.default.createElement("span", null);
    };

    var mapRecordsToProps = function mapRecordsToProps(_ref20) {
      var showUsers = _ref20.showUsers;

      if (showUsers) {
        return {
          users: function users(q) {
            return q.findRecords('user');
          }
        };
      }

      return {};
    };

    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
    var testComponent;

    var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      showUsers: true
    })));

    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.users).toHaveLength(1);
    componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      showUsers: false
    })));
    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.users).toBeUndefined();
    done();
  });
});
test('withData resets some props when mRtP returns different keys', function (done) {
  memory.update(function (t) {
    return t.addRecord({
      type: 'user',
      id: 'test-user',
      attributes: {
        name: 'Test user'
      }
    });
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'my-first-todo',
        attributes: {
          description: 'Run tests'
        }
      });
    });
  }).then(function () {
    var Test = function Test() {
      return /*#__PURE__*/_react.default.createElement("span", null);
    };

    var mapRecordsToProps = function mapRecordsToProps(_ref21) {
      var showTodos = _ref21.showTodos,
          showUsers = _ref21.showUsers;

      if (showUsers) {
        return {
          users: function users(q) {
            return q.findRecords('user');
          }
        };
      }

      if (showTodos) {
        return {
          todos: function todos(q) {
            return q.findRecords('todo');
          }
        };
      }

      return {};
    };

    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
    var testComponent;

    var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      showUsers: true,
      showTodos: false
    })));

    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.users).toHaveLength(1);
    expect(testComponent.props.todos).toBeUndefined();
    componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      showUsers: false,
      showTodos: true
    })));
    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.users).toBeUndefined();
    expect(testComponent.props.todos).toHaveLength(1);
    done();
  });
});
test('withData keeps references for unchanged records when own props are updated', function (done) {
  var callCount = 0;
  memory.update(function (t) {
    return t.addRecord({
      type: 'user',
      id: 'test-user',
      attributes: {
        name: 'Test user'
      }
    });
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'test-todo',
        attributes: {
          description: 'Run even more tests'
        },
        relationships: {
          owner: {
            data: {
              type: 'user',
              id: 'test-user'
            }
          }
        }
      });
    });
  }).then(function () {
    var Test = function Test() {
      callCount++;
      return /*#__PURE__*/_react.default.createElement("span", null, "test");
    }; // Need to provide one argument at least, otherwise re-renders are optimized


    var mapRecordsToProps = function mapRecordsToProps(props) {
      return {
        todos: function todos(q) {
          return q.findRelatedRecords({
            type: 'user',
            id: 'test-user'
          }, 'todos');
        }
      };
    };

    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
    var testComponent;
    var todosProp;

    var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      unusedProp: 1
    })));

    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.todos).toHaveLength(1);
    todosProp = testComponent.props.todos;
    componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      unusedProp: 1
    })));
    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.todos).toHaveLength(1);
    expect(testComponent.props.todos).toBe(todosProp);
    componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      unusedProp: 2
    })));
    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.todos).toHaveLength(1);
    expect(testComponent.props.todos).toEqual(todosProp);
    expect(callCount).toBe(2);
    done();
  });
});
test('withData keeps references for unchanged records when own props are updated', function (done) {
  var callCount = 0;
  memory.update(function (t) {
    return t.addRecord({
      type: 'user',
      id: 'user-1',
      attributes: {
        name: 'Test user 1'
      }
    });
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord({
        type: 'user',
        id: 'user-2',
        attributes: {
          name: 'Test user 2'
        }
      });
    });
  }).then(function () {
    return memory.update(function (t) {
      return t.addRecord({
        type: 'todo',
        id: 'test-todo',
        attributes: {
          description: 'Run some tests'
        }
      });
    });
  }).then(function () {
    var Test = function Test() {
      callCount++;
      return /*#__PURE__*/_react.default.createElement("span", null, "test");
    };

    var mapRecordsToProps = function mapRecordsToProps(_ref22) {
      var userId = _ref22.userId;
      return {
        todos: function todos(q) {
          return q.findRecords('todo');
        },
        user: function user(q) {
          return q.findRecord({
            type: 'user',
            id: userId
          });
        }
      };
    };

    var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
    var testComponent;
    var todosProp;

    var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      userId: 'user-1'
    })));

    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.todos).toHaveLength(1);
    expect(testComponent.props.user.id).toEqual('user-1');
    todosProp = testComponent.props.todos;
    componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
      dataStore: memory
    }, /*#__PURE__*/_react.default.createElement(TestWithData, {
      userId: 'user-2'
    })));
    testComponent = componentRenderer.root.findByType(Test);
    expect(testComponent.props.todos).toHaveLength(1);
    expect(testComponent.props.todos).toBe(todosProp);
    expect(testComponent.props.user.id).toEqual('user-2');
    expect(callCount).toBe(2);
    done();
  });
});
test('[regression] withData passes convenience props in subsequent renders (without ownProps)', function () {
  var Test = function Test() {
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var mapRecordsToProps = {};
  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
  var testComponent;

  var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

  testComponent = componentRenderer.root.findByType(Test);
  expect(testComponent.props.dataStore).toBe(memory);
  expect(_typeof(testComponent.props.queryStore)).toEqual('function');
  expect(_typeof(testComponent.props.updateStore)).toEqual('function');
  componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, {
    userId: "test-user"
  })));
  testComponent = componentRenderer.root.findByType(Test);
  expect(testComponent.props.dataStore).toBe(memory);
  expect(_typeof(testComponent.props.queryStore)).toEqual('function');
  expect(_typeof(testComponent.props.updateStore)).toEqual('function');
});
test('[regression] withData passes convenience props in subsequent renders (with ownProps)', function () {
  var Test = function Test() {
    return /*#__PURE__*/_react.default.createElement("span", null, "test");
  };

  var mapRecordsToProps = function mapRecordsToProps(ownProps) {
    return {};
  };

  var TestWithData = (0, _index.withData)(mapRecordsToProps)(Test);
  var testComponent;

  var componentRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, null)));

  testComponent = componentRenderer.root.findByType(Test);
  expect(testComponent.props.dataStore).toBe(memory);
  expect(_typeof(testComponent.props.queryStore)).toEqual('function');
  expect(_typeof(testComponent.props.updateStore)).toEqual('function');
  componentRenderer.update( /*#__PURE__*/_react.default.createElement(_index.DataProvider, {
    dataStore: memory
  }, /*#__PURE__*/_react.default.createElement(TestWithData, {
    userId: "test-user"
  })));
  testComponent = componentRenderer.root.findByType(Test);
  expect(testComponent.props.dataStore).toBe(memory);
  expect(_typeof(testComponent.props.queryStore)).toEqual('function');
  expect(_typeof(testComponent.props.updateStore)).toEqual('function');
});