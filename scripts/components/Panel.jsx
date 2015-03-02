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
    window.addEventListener('keypress', this.windowKeyPress);
    SelectionStore.addChangeListener(this._onChange);
    this._onChange(); // TODO: remove this later, better to have it go through dispatcher
  },
  componentWillUnMount() {
    window.removeEventListener('keypress', this.windowKeyPress);
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
        <span className={settingClasses} onClick={this.clickHeaderIcon.bind(this, 'settings')} />
        <span className={addClasses} onClick={this.clickHeaderIcon.bind(this, 'add')} />
        <span className={directionClasses} onClick={this.clickHeaderIcon.bind(this, 'directions')} />
      </div>
    );
  },
  renderBody() {
    var body = null;
    if (this.state.panelBody) {
      if (this.state.panelBody === 'add') {
        body = (
          <div className="Panel-body-add">
            <h5>Add expense</h5>
            <AddExpenseComponent />
            <h5>Add category</h5>
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
  windowKeyPress(e) {
    var CHAR_A = 97;
    var CHAR_I = 105;
    var CHAR_S = 115;
    var pressedKey = e.keyCode;

    if (pressedKey === CHAR_A) {
      this.clickHeaderIcon('add');
    } else if (pressedKey === CHAR_I) {
      this.clickHeaderIcon('directions');
    } else if (pressedKey === CHAR_S) {
      this.clickHeaderIcon('settings');
    }
  },
  clickHeaderIcon(icon) {
    var state = React.addons.update(this.state, {
      $merge: {panelBody: icon, selection: null}
    });
    this.setState(state);
  }
});

module.exports = ExpenseApp;