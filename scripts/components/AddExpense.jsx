var React = require('react/addons');
var _ = require('lodash');
var ViewActionCreators = require('../actions/ViewActionCreators');

var AddExpense = React.createClass({
  clearState() {
    return {
      name: '',
      amount: ''
    }
  },
  getInitialState() {
    return this.clearState();
  },
  render() {
    var disabled = !this.state.name || !this.state.amount;
    return (
      <div className="AddExpense">
        <input className="input-sm" placeholder="name" value={this.state.name}
          onChange={this.onChangeName} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
        <input className="input-sm" placeholder="amount" value={this.state.amount}
          onChange={this.onChangeAmount} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
        <button className="btn btn-sm btn-success" onClick={this.addExpense} disabled={disabled} >
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
  onChangeName(e) {
    var state = React.addons.update(this.state, {
      $merge: {name: e.target.value}
    });
    this.setState(state);
  },
  onChangeAmount(e) {
    var amount = Number(e.target.value);
    if (!_.isNaN(amount)) {
      var state = React.addons.update(this.state, {
        $merge: {amount: e.target.value}
      });
      this.setState(state);
    }
  },
  addExpense() {
    if (this.state.name && this.state.amount) {
      ViewActionCreators.addExpense({
        name: this.state.name,
        amount: Number(this.state.amount)
      });
      this.setState(this.clearState());
    }
  }
});

module.exports = AddExpense;