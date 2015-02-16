var React = require('react');
var ViewActionCreators = require('../actions/ViewActionCreators');

var AddCategory = React.createClass({
  render() {
    return (
      <div className="AddCategory" onClick={this.addCategory}>
        Category
      </div>
    );
  },
  addCategory() {
    ViewActionCreators.addCategory();
  }
});

module.exports = AddCategory;