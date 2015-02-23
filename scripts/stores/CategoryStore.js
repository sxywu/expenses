var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];

function addCategory(category) {
  var id = _.chain(_categories)
    .map((category) => parseInt(category.id.split('/')[1]))
    .max().value();
  id += 1;
  _categories.push({
    id: 'category/' + id,
    name: category.name
  });
}

function deleteCategory(categoryId) {
  _categories = _.filter(_categories, (category) => category.id !== categoryId);
}

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
  switch (action.actionType) {
    case Constants.ADD_CATEGORY:
      addCategory(action.data);
      break;

    case Constants.DELETE_CATEGORY:
      deleteCategory(action.data);
      break;

    default:
      return true;
  };

  CategoryStore.emitChange();
  // lazily storing it in localStorage...
  localStorage.categories = JSON.stringify(_categories);
});

module.exports = CategoryStore;