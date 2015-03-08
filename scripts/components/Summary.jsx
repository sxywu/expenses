var React = require('react/addons');
var _ = require('lodash');
var ViewActionCreators = require('../actions/ViewActionCreators');
var AppCalculationUtils = require('../utils/AppCalculationUtils');
var LabelComponent = require('./Label.jsx');

var Summary = React.createClass({
  render() {
    var categories = _.chain(this.props.categories)
      .map((category) => {
        return AppCalculationUtils.calculateCategory(category, this.props.expenses);
      }).sortBy((category) => -category.total)
      .map((category) => {
        return (
          <div>
            <LabelComponent data={category} /> 
            ${category.total.toFixed(2)}
          </div>
        );
      }).value();
    var total = _.reduce(this.props.expenses, (memo, expense) => {
      return memo + expense.amount;
    }, 0);
      
    return (
      <div className="Summary">
        <h4 className="Summary-header">
          Weekly total
          <br />
          ${total.toFixed(2)}
        </h4>
        <div className="Summary-body">
          {categories}
        </div>
      </div>
    );
  }
});

module.exports = Summary;