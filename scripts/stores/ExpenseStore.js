var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _expenses = localStorage.expenses ? JSON.parse(localStorage.expenses) : [];

function addExpense(expense) {
  _expenses.push({
    id: 'expense/' + _expenses.length,
    name: expense.name,
    amount: expense.amount,
    category: ['category/1']
  });
  debugger
}

var ExpenseStore = assign({}, EventEmitter.prototype, {
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
    return _expenses;
  },
  get(id) {
    return _.find(_expenses, (expense) => expense.id === id);
  }
});

ExpenseStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case Constants.ADD_EXPENSE:
      addExpense(action.data);
      break;

    default:
      return true;
  };

  ExpenseStore.emitChange();
  // lazily storing it in localStorage...
  localStorage.expenses = JSON.stringify(_expenses);
});

module.exports = ExpenseStore;