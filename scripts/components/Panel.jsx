var React = require('react/addons');
var cx = React.addons.classSet;
var SelectionStore = require('../stores/SelectionStore');
var CategoryStore = require('../stores/CategoryStore');
var ExpenseStore = require('../stores/ExpenseStore');
var AddCategoryComponent = require('./AddCategory.jsx');
var AddExpenseComponent = require('./AddExpense.jsx');
var CategoryDetailComponent = require('./CategoryDetail.jsx');
var ExpenseDetailComponent = require('./ExpenseDetail.jsx');

// notes: how to stagger transitions?
// eventually use immutable diff?
// todo: directions
var ExpenseApp = React.createClass({
  getInitialState() {
    return {
      selection: SelectionStore.getSelection(),
      panelBody: "directions"
    }
  },
  componentDidMount() {
    SelectionStore.addChangeListener(this._onChange);
    this._onChange(); // TODO: remove this later, better to have it go through dispatcher
  },
  componentWillUnMount() {
    SelectionStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    var selection = SelectionStore.getSelection();
    var merge = {
      selection,
      panelBody: selection ? null : 'directions'
    };
    var state = React.addons.update(this.state, {
      $merge: merge
    });
    this.setState(state);
  },
  render() {
    return (
      <div className="Panel">
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  },
  renderHeader() {
    var addClasses = cx({
      "glyphicon": true,
      "glyphicon-plus-sign": true,
      "selected": this.state.panelBody === 'add'
    });
    var directionClasses = cx({
      "glyphicon": true,
      "glyphicon-info-sign": true,
      "selected": this.state.panelBody === 'directions'
    });
    var settingClasses = cx({
      "glyphicon": true,
      "glyphicon-cog": true,
      "selected": this.state.panelBody === 'settings'
    });

    return (
      <div className="Panel-header">
        <span className={addClasses} onClick={this.clickHeaderIcon.bind(this, 'add')} />
        <span className={directionClasses} onClick={this.clickHeaderIcon.bind(this, 'directions')} />
        <span className={settingClasses} onClick={this.clickHeaderIcon.bind(this, 'settings')} />
      </div>
    );
  },
  renderBody() {
    var body = null;
    if (this.state.panelBody) {
      if (this.state.panelBody === 'add') {
        body = (
          <div className="Panel-body-add">
            <h4>Add Expense</h4>
            <AddExpenseComponent />
            <h4>Add Category</h4>
            <AddCategoryComponent />
          </div>
        );
      }
    } else if (this.state.selection) {
      // if no category or expense is selected, then default to one of the header icons
      if (this.state.selection.type === 'category') {
        body = (<CategoryDetailComponent data={this.state.selection} />);
      } else if (this.state.selection.type === 'expense') {
        body = (<ExpenseDetailComponent data={this.state.selection} />);
      }
    }

    return (
      <div className="Panel-body">
        {body}
      </div>
    );
  },
  clickHeaderIcon(icon) {
    var state = React.addons.update(this.state, {
      $merge: {panelBody: icon, selection: null}
    });
    this.setState(state);
  }
});

module.exports = ExpenseApp;