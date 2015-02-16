var React = require('react');
var CategoryStore = require('../stores/CategoryStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var AddCategory = React.createClass({
  render() {
    CategoryStore.getAll();
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