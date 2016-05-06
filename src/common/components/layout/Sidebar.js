import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import TwitterSearch from '../docsearch/twitterSearch.js';

class Sidebar extends Component {

  constructor(props){
	super(props);
  }

  render() {

  	const {version,user} = this.props;

    return (

    	<div className="sidebar">

		  <TwitterSearch />

		</div>
    );
  }
}

export default Sidebar;
