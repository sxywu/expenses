var React = require('react/addons');
var _ = require('lodash');
var d3 = require('d3');
var ViewActionCreators = require('../actions/ViewActionCreators');

var AddExpense = React.createClass({
  clearState() {
    var date = this.props.data ? this.props.data.timestamp : new Date();

    return {
      name: this.props.data ? this.props.data.name : '',
      amount: this.props.data ? this.props.data.amount : '',
      month: date.getMonth() + 1,
      date: date.getDate(),
      year: date.getFullYear(),
      editing: !!this.props.data
    }
  },
  getInitialState() {
    return this.clearState();
  },
  render() {
    var disabled = !this.state.name || !this.state.amount ||
      !this.state.month || !this.state.date || !this.state.year;
    var buttonText = this.state.editing ? 'Save Edits' : 'Add';
    var today = new Date();
    return (
      <div className="AddExpense">
        <div className="AddExpense-body">
          <input className="input-sm form-control width100" placeholder="name" value={this.state.name}
            onChange={this.onChangeName} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
          <input className="input-sm form-control width100" placeholder="amount" value={this.state.amount}
            onChange={this.onChangeAmount} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
          <input className="input-sm form-control width30" placeholder="month" value={this.state.month}
            onChange={this.onChangeMonth} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
          <input className="input-sm form-control width30" placeholder="date" value={this.state.date}
            onChange={this.onChangeDate} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
          <input className="input-sm form-control width30" placeholder="year" value={this.state.year}
            onChange={this.onChangeYear} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
          <button className="btn btn-sm btn-success width100" onClick={this.addExpense} disabled={disabled} >
            {buttonText}
          </button>
        </div>
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
    var name = e.target.value;
    this.setState({name});
  },
  onChangeAmount(e) {
    var amount = e.target.value;
    if (!Number(e.target.value)) {
      amount = '';
    } else if (_.isNaN(Number(amount))) {
      amount = this.state.amount;
    }
    this.setState({amount});
  },
  onChangeMonth(e) {
    var month = Number(e.target.value);
    if (!e.target.value) {
      month = '';
    } else if (_.isNaN(month) || month < 1 || month > 12) {
      month = this.state.month;
    }
    this.setState({month});
  },
  onChangeDate(e) {
    var date = Number(e.target.value);
    if (!e.target.value) {
      date = '';
    } else if (_.isNaN(date) || date < 1 || date > 31) {
      date = this.state.date;
    }
    this.setState({date});
  },
  onChangeYear(e) {
    var today = new Date();
    var year = Number(e.target.value);
    if (!e.target.value) {
      year = '';
    } else if (_.isNaN(year) || year < 1 || year > today.getFullYear()) {
      year = this.state.year;
    }
    this.setState({year});
  },
  addExpense() {
    var timestamp = new Date(this.state.year, this.state.month - 1, this.state.date);
    if (this.state.name && this.state.amount && timestamp) {
      if (this.state.editing) {
        ViewActionCreators.editExpense({
          id: this.props.data.id,
          name: this.state.name,
          amount: Number(this.state.amount),
          timestamp: timestamp
        });
        this.props.onSubmit();
      } else {
        ViewActionCreators.addExpense({
          name: this.state.name,
          amount: Number(this.state.amount),
          timestamp: timestamp
        });
        this.setState(this.clearState());
      }
    }
  }
});

module.exports = AddExpense;