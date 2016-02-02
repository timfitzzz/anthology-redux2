import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import TwitterSearch from '../../docsearch/twitterSearch';

class SceneEditSidebar extends Component {

  render() {

    return(

      <div className="scene-edit-sidebar">

        <TwitterSearch />


      </div>

    )


  }


}

export default SceneEditSidebar;
