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
  }
};

module.exports = ViewActionCreators;