var React = require('react');
var ViewActionCreators = require('../actions/ViewActionCreators');

var AddCategory = React.createClass({
  getInitialState() {
    return {
      name: ''
    }
  },
  render() {
    return (
      <div className="AddCategory">
        <input className="input-sm" placeholder="name"
          onChange={this.onChange} />
        <div className="btn btn-sm btn-success" onClick={this.addCategory}
          disabled={!this.state.name} >
          Add
        </div>
      </div>
    );
  },
  onChange(e) {
    // set the state to user input
    this.setState({
      name: e.target.value
    });
  },
  addCategory() {
    ViewActionCreators.addCategory({
      name: this.state.name
    });
  }
});

module.exports = AddCategory;