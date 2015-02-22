var React = require('react');
var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CategoryStore = require('./CategoryStore');
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var positions = localStorage.positions ? JSON.parse(localStorage.positions) : {};

function savePosition(node, fixed) {
  positions[node.id] = React.addons.update(positions[node.id] || {}, {
    $merge: {x: node.x, y: node.y}
  });
  if (fixed) {
    positions[node.id].fixed = true;
  }
}

function savePositions(nodes) {
  _.each(nodes, (node) => savePosition(node));
}

// store information about the graph
// such as pan/zoom level or position of nodes
var GraphStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getPositions() {
    return positions;
  }
});

GraphStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case Constants.SAVE_POSITIONS:
      savePositions(action.data.categories);
      savePositions(action.data.expenses);
      return true;

    case Constants.AFTER_DRAG_EXPENSE:
      savePosition(action.data, true);
      break;

    default:
      return true;
  };

  GraphStore.emitChange();
  // lazily storing it in localStorage...
  localStorage.positions = JSON.stringify(positions);
});

module.exports = GraphStore; 