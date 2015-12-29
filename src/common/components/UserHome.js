import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SceneList from './scenes/SceneList';
import UserHomeControls from './layout/UserHomeControls'
// import Picker from './reddit/Picker';
// import Posts from './reddit/Posts';

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   const { selectedReddit } = this.props;
  //   this.props.fetchPostsIfNeeded(selectedReddit);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.selectedReddit !== this.props.selectedReddit) {
  //     const { selectedReddit } = nextProps;
  //     this.props.fetchPostsIfNeeded(selectedReddit);
  //   }
  // }
  //
  // handleChange(nextReddit) {
  //   this.props.selectReddit(nextReddit);
  // }
  //
  // handleRefreshClick(e) {
  //   e.preventDefault();
  //   const { selectedReddit } = this.props;
  //   this.props.invalidateReddit(selectedReddit);
  //   this.props.fetchPostsIfNeeded(selectedReddit);
  // }

  render () {
    const { scenes, user, createScene } = this.props;
    return (
      <div>
        <UserHomeControls createScene={createScene}/>
        <SceneList scenes={scenes} user={user}/>
      </div>

    );
  }
}

UserHome.propTypes = {
  scenes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserHome;
