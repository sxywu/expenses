var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _categories = [];

var CategoryStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAll() {
    return _categories;
  },
  get(id) {
    return _.find(_categories, (category) => category.id === id);
  }
});

CategoryStore.dispatchToken = AppDispatcher.register((action) => {
  console.log(action);
});

module.exports = CategoryStore;