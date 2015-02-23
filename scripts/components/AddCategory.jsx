var React = require('react/addons');
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
        <input className="input-sm" placeholder="name" value={this.state.name}
          onChange={this.onChange} onKeyDown={this.onKeyDown} />
        <div className="btn btn-sm btn-success" onClick={this.addCategory}
          disabled={!this.state.name} >
          Add
        </div>
      </div>
    );
  },
  onKeyDown(e) {
    // if user hits enter, add expense
    var ENTER_KEY = 13;
    if (e.keyCode === ENTER_KEY) {
      this.addCategory();
      return;
    }
  },
  onChange(e) {
    // set the state to user input
    this.setState({
      name: e.target.value
    });
  },
  addCategory() {
    if (this.state.name) {
      ViewActionCreators.addCategory({
        name: this.state.name
      });
      this.setState({name: ''});
    }
  }
});

module.exports = AddCategory;