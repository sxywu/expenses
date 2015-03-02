var React = require('react/addons');
var ViewActionCreators = require('../actions/ViewActionCreators');

var AddCategory = React.createClass({
  getInitialState() {
    return {
      name: ''
    }
  },
  render() {
    var disabled = !this.state.name;
    return (
      <div className="AddCategory">
        <input className="input-sm" placeholder="name" value={this.state.name}
          onChange={this.onChange} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
        <button className="btn btn-sm btn-success" onClick={this.addCategory} disabled={disabled} >
          Add
        </button>
      </div>
    );
  },
  onKeyPress(e) {
    e.stopPropagation();
  },
  onKeyDown(e) {
    var ESC_KEY = 27;
    if (e.keyCode === ESC_KEY) {
      e.target.blur();
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