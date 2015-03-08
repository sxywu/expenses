var React = require('react/addons');
var _ = require('lodash');
var ViewActionCreators = require('../actions/ViewActionCreators');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var LabelComponent = require('./Label.jsx');

var Summary = React.createClass({
  render() {
    var categories = _.chain(this.props.categories)
      .map((category) => {
        return GraphCalculationUtils.calculateCategory(category, this.props.expenses);
      }).sortBy((category) => -category.total)
      .map((category) => {
        return (
          <div>
            <LabelComponent data={category} /> 
            ${category.total.toFixed(2)}
          </div>
        );
      }).value();
      
    return (
      <div className="Summary">
        <h4 className="Summary-header">
          Summary
        </h4>
        <div className="Summary-body">
          {categories}
        </div>
      </div>
    );
  }
});

module.exports = Summary;