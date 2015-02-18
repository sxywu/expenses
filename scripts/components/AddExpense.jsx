var React = require('react');
var ViewActionCreators = require('../actions/ViewActionCreators');

var AddExpense = React.createClass({
  getInitialState() {
    return {
      name: '',
      amount: 0
    }
  },
  render() {
    return (
      <div className="AddExpense">
        <input className="input-sm" placeholder="name"
          onChange={this.onChangeName} />
        <input className="input-sm" placeholder="amount"
          onChange={this.onChangeAmount} />
        <div className="btn btn-sm btn-success" onClick={this.addExpense}
          disabled={!this.state.name || !this.state.amount} >
          Add
        </div>
      </div>
    );
  },
  onChangeName(e) {
    // var state = React.addons.update(this.state, {
    //   $merge: {name: e.target.value}
    // });
    var state = {
      name: e.target.value,
      amount: this.state.amount
    }
    this.setState(state);
  },
  onChangeAmount(e) {
    // var state = React.addons.update(this.state, {
    //   $merge: {amount: Number(e.target.value)}
    // });
    var state = {
      name: this.state.name,
      amount: Number(e.target.value)
    }
    this.setState(state);
  },
  addExpense() {
    ViewActionCreators.addExpense({
      name: this.state.name,
      amount: this.state.amount
    });
  }
});

module.exports = AddExpense;