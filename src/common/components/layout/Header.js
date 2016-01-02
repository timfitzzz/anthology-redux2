import React, { Component, PropTypes } from 'react';
import {authorizeTwitter} from '../../actions/user';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as UserActions from '../../actions/user';

class Header extends Component {

  // componentWillMount() {
  //   if (this.props.user.accounts.twitter) {
  //    this.props.dispatch(UserActions.authorizeTwitter());
  //   }
  // }

  render() {
  	const {counter, todos} = this.props;
  	const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );
    const activeCount = todos.length - completedCount;


    return (
      	<div className="masthead">
			<div className="container">
			  <h3 className="masthead-title">
			    <a href="/" title="Home">Twarchiver v0.1</a>

			  </h3>
        {this.renderUserOrLoginButton()}
			</div>
		</div>
    );
  }

  renderUserOrLoginButton() {
    if (!this.props.user.accounts.twitter) {
      return <div className="login-button">
        <button style={{height: "40px"}} onClick={this.sendToTwitter}>Login With Twitter</button></div>
    }
    else {
      return <div className="user-controls">
        <button onClick={this.logoutUser}>{"Click to log out @" + this.props.user.accounts.twitter.username}</button>
      </div>
    }
  }

  sendToTwitter() {
    location.href="/auth/twitter"
  }

  logoutUser() {
    location.href="/logout"
  }

  authTwitter() {
    var that = this;
    let onClick = function() {
      that.props.dispatch(UserActions.authorizeTwitter());
    }
    return onClick;

  }
}

Header.propTypes = {
  counter: PropTypes.number.isRequired,
  todos: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};


export default connect()(Header);
