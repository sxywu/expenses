var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ViewActionCreators = {

  addCategory(data) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_CATEGORY,
      data: data
    });
  },

  addExpense(data) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_EXPENSE,
      data: data
    });
  },

  savePositions(data) {
    AppDispatcher.dispatch({
      actionType: Constants.SAVE_POSITIONS,
      data: data
    });
  },

  savePosition(data) {
    AppDispatcher.dispatch({
      actionType: Constants.SAVE_POSITION,
      data: data
    });
  },

  addExpenseToCategory(data) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_EXPENSE_TO_CATEGORY,
      data: data
    });
  }
};

module.exports = ViewActionCreators;