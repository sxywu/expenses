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
    return (
      <div className="AddExpense">
        <input className="input-sm" placeholder="name"
          value={this.state.name} onChange={this.onChangeName} />
        <input className="input-sm" placeholder="amount"
          value={this.state.amount} onChange={this.onChangeAmount} />
        <div className="btn btn-sm btn-success" onClick={this.addExpense}
          disabled={!this.state.name || !this.state.amount} >
          Add
        </div>
      </div>
    );
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
    ViewActionCreators.addExpense({
      name: this.state.name,
      amount: Number(this.state.amount)
    });
    this.setState(this.clearState());
  }
});

module.exports = AddExpense;