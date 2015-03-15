var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _expenses = localStorage.expenses ? JSON.parse(localStorage.expenses) : [];
_.each(_expenses, (expense) => {
  // when we first get the expenses from localStorage
  // go through and convert timestamp string to Date obj
  expense.timestamp = new Date(expense.timestamp);
});

function addExpense(expense) {
  var id = 1;
  if (_expenses.length) {
    id = _.chain(_expenses)
      .map((expense) => parseInt(expense.id.split('/')[1]))
      .max().value();
    id += 1;
  }
  _expenses.push({
    id: 'expense/' + id,
    name: expense.name,
    amount: expense.amount,
    categories: [],
    timestamp: new Date()
  });
}

function editExpense(edits) {
  var expense = _.find(_expenses, (expense) => expense.id === edits.id);
  if (!expense) return;
  expense.name = edits.name;
  expense.amount = edits.amount;
}

function deleteExpense(expenseId) {
  _expenses = _.filter(_expenses, (expense) => expense.id !== expenseId);
}

function addExpenseToCategory(expense, category) {
  var expense = _.find(_expenses, (exp) => exp.id === expense.id);
  // if expense is already in there, then we should just remove it
  var expenseExists = false;
  expense.categories = _.filter(expense.categories, (categoryId) => {
    if (categoryId === category.id) {
      expenseExists = true;
      return false;
    }
    return true;
  });
  // if it doesn't exist, then add it in
  if (!expenseExists) {
    expense.categories.push(category.id)
  }
}

function removeDeletedCategory(categoryId) {
  _.each(_expenses, (expense) => {
    expense.categories = _.reject(expense.categories, (category) => {
      // if the category id matches, then remove that category
      return category === categoryId;
    });
  });
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

    case Constants.EDIT_EXPENSE:
      editExpense(action.data);
      break;

    case Constants.DELETE_EXPENSE:
      deleteExpense(action.data);
      break;

    case Constants.ADD_EXPENSE_TO_CATEGORY:
      addExpenseToCategory(action.data.expense, action.data.category);
      break;

    case Constants.DELETE_CATEGORY:
      removeDeletedCategory(action.data);
      break;

    default:
      return true;
  };

  ExpenseStore.emitChange();
  // lazily storing it in localStorage...
  localStorage.expenses = JSON.stringify(_expenses);
});

module.exports = ExpenseStore;