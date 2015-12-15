import React, { Component, PropTypes } from 'react';
import Header from './todo/Header';
import Section from './todo/Section';

var hello = "HI Z"

class Todo extends Component {
  render() {
    const { todos, actions } = this.props;
    return (
      <div className="todocontainer">
        <Header addTodo={actions.addTodo} />
        <Section todos={todos} actions={actions} />
      </div>
    );
  }
}

Todo.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todo;
