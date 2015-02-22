var React = require('react/addons');
var ViewActionCreators = require('../actions/ViewActionCreators');
var GraphCalculationUtils = require('../utils/GraphCalculationUtils');
var CategoryStore = require('../stores/CategoryStore');
var LabelComponent = require('./Label.jsx');

var CategoryDetail = React.createClass({
  render() {
    var category = CategoryStore.get(this.props.data.id);

    return (
      <div className="CategoryDetail">
        {category.name}
      </div>
    );
  }
});

module.exports = CategoryDetail;