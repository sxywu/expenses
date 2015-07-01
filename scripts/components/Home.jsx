var React = require('react/addons');
var cx = React.addons.classSet;
var CategoryComponent = require('./Category.jsx');
var ExpenseComponent = require('./Expense.jsx');

var Home = React.createClass({
  getInitialState() {
    return {
      top: 0,
      left: 0,
      showModal: true
    }
  },
  componentDidMount() {
    this._onWindowResize();
    window.addEventListener('resize', this._onWindowResize);
  },
  componentWillReceiveProps(nextProps) {
    this.setState({showModal: nextProps.data.showModal});
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this._onWindowResize);
  },
  _onWindowResize() {
    var element = this.refs.body.getDOMNode();
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    var top = (window.innerHeight - height) / 2;
    var left = (window.innerWidth - width) / 2;
    this.setState({top, left});
  },
  render() {
    var homeClass = cx({
      "Home-hide": !this.state.showModal
    });
    var bodyStyle = {top: this.state.top, left: this.state.left};

    return (
      <div className={homeClass}>
        <div className="Home-backdrop" onClick={this.props.closeModal} />
        <div className="Home-body" ref="body" style={bodyStyle}>
          {this.renderDirections()}
          {this.renderAbout()}
        </div>
      </div>
    );
  },
  renderDirections() {
    var addClasses = cx({
      "glyphicon": true,
      "glyphicon-plus-sign": true
    });
    var categoryStyle = {width: 50, height: 40};
    var categoryData = {name: 'Coffee', size: 7.5, x: 25, y: 11, fill: '#FF8800', selected: true};
    var category = (
      <svg style={categoryStyle}>
        <CategoryComponent data={categoryData} />
      </svg>
    );
    var expenseStyle = {width: 50, height: 32};
    var expenseData = {name: 'Coffee Bar', size: 10, x1: 25, y: 9, selected: true};
    var expense = (
      <svg style={expenseStyle}>
        <ExpenseComponent data={expenseData} />
      </svg>
    );
    return (
      <div className="Directions-body">
        <h3>Add</h3>
        <h5>
        Add an expense or category from the left panel.
        </h5>
        <img src="images/add2.gif" />
        <h3>Drag</h3>
        <h5>
          Drag an expense over a category to add to the category, drag again to remove from the category.
          An expense can belong to multiple categories.
        </h5>
        <img src="images/drag.gif" />
        <h3>Click</h3>
        <h5>
          Click on any expense or category to view it in detail, click again to deselect.
          While in detail view, take actions (delete, edit, close).
          The graph shows a week of expenses at a time.
        </h5>
        <img src="images/click.gif" />
      </div>
    );
  },
  renderAbout() {
    return (
      <div className="About-body">
        <h3>About</h3>
        <h5>
        This simple expense-tracking app is an accompaniment to a blog post on <a href="http://d3js.org/" target="_new">D3</a>+ 
        <a href="http://facebook.github.io/react/" target="_new">React</a>+ 
        <a href="http://facebook.github.io/flux/docs/overview.html" target="_new">Flux</a>.
        The blog post itself is being slowly written, but in the meanwhile, you can find the <a href="https://github.com/sxywu/expenses" target="_new">source code here</a>.
        </h5>
        <h5>
        A caveat: there's no backend implemented, so all of the data is stored locally on the client.
        </h5>
        <br />
        <h5>
        <a href="https://twitter.com/shirleyxywu" target="_new">Let me know what you think</a><br />
        <a href="https://github.com/sxywu/expenses/issues" target="_new">Tell me if you find a bug</a><br />
        </h5>
      </div>
    );
  }
});

module.exports = Home;