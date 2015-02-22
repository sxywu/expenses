var React = require('react/addons');
var ViewActionCreators = require('../actions/ViewActionCreators');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var CategoryStore = require('../stores/CategoryStore');
var LabelComponent = require('./Label.jsx');

var CategoryDetail = React.createClass({
  render() {
    var category = CategoryStore.get(this.props.data.id);
    category = GraphCalculationUtils.calculateCategory(category);

    return (
      <div className="CategoryDetail">
        <h4><LabelComponent data={category} /></h4>
      </div>
    );
  }
});

module.exports = CategoryDetail;