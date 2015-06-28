var React = require('react/addons');
var cx = React.addons.classSet;
var _ = require('lodash');

var SelectionStore = require('../stores/SelectionStore');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var AddCategoryComponent = require('./AddCategory.jsx');
var AddExpenseComponent = require('./AddExpense.jsx');
var SummaryComponent = require('./Summary.jsx');
var CategoryDetailComponent = require('./CategoryDetail.jsx');
var ExpenseDetailComponent = require('./ExpenseDetail.jsx');
var ViewActionCreators = require('../actions/ViewActionCreators');
var AppCalculationUtils = require('../utils/AppCalculationUtils');

// notes: how to stagger transitions?
// eventually use immutable diff?
// todo: home
var ExpenseApp = React.createClass({
  getInitialState() {
    var top = 0;
    return {
      selection: SelectionStore.getSelection(),
      top: top,
      height: window.innerHeight - top
    }
  },
  componentDidMount() {
    window.addEventListener('resize', this._onWindowResize);
    SelectionStore.addChangeListener(this._onChange);
    this._onChange(); // TODO: remove this later, better to have it go through dispatcher
  },
  componentWillReceiveProps(nextProps) {
    if (!this.state.selection) return;

    // if selection not in expenses, send unselectNode
    var selectionExists = _.chain(nextProps.data.expenses)
      .pluck('id')
      .union(_.pluck(nextProps.data.categories, 'id'))
      .contains(this.state.selection && this.state.selection.id)
      .value();
    if (!selectionExists) {
      this.setState({selection: null});
      _.define(() => ViewActionCreators.unselectNode());
    }
  },
  componentWillUnMount() {
    window.removeEventListener('resize', this._onWindowResize);
    SelectionStore.removeChangeListener(this._onChange);
  },
  _onWindowResize() {
    var height = window.innerHeight - this.state.top;
    this.setState({height});
  },
  _onChange() {
    var selection = SelectionStore.getSelection();
    this.setState({selection});
  },
  render() {
    var summary = (<SummaryComponent categories={this.props.data.categories}
      expenses={this.props.data.expenses} />);;
    if (this.state.selection) {
      if (this.state.selection.type === 'category') {
        summary = (<CategoryDetailComponent data={this.state.selection}
          expenses={this.props.data.expenses} />);
      } else if (this.state.selection.type === 'expense') {
        summary = (<ExpenseDetailComponent data={this.state.selection} />);
      }
    }
    var add = (
      <div className="Panel-body-add">
        <AddExpenseComponent />
        <AddCategoryComponent />
      </div>
    );

    var bodyStyle = {"max-height": this.state.height};
    return (
      <div className="Panel" style={bodyStyle}>
        {summary}
        {add}
      </div>
    );
  }
});

module.exports = ExpenseApp;