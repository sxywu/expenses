var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _selection;

var SelectionStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getSelection() {
    return _selection;
  }
});

SelectionStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case Constants.SELECT_NODE:
      _selection = action.data;
      break;

    case Constants.UNSELECT_NODE:
      _selection = null;
      break;
      
    default:
      return true;
  };

  SelectionStore.emitChange();
});

module.exports = SelectionStore;