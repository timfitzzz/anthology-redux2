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

  componentWillMount() {
    const { scenes, userScenes } = this.props;
    console.log('userScenes is ' + userScenes);
    if (!userScenes[0]) {
      console.log("getting user scenes");
      this.props.getUserSceneIds(this.props.user._id);
    } else if (userScenes[0] !== "fetching" && userScenes[0] !== "none" && !scenes[userScenes[0]]) {
      this.props.getSceneBriefs(userScenes);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.scenes.user);
  //   if (this.props.scenes.user.length === 1 && nextProps.scenes.user.length > 1) {
  //     console.log('last props user length = ' + this.props.scenes.user.length + " and next is" + nextProps.scenes.user.lengthß)
  //     this.props.dispatch(this.props.getSceneBriefs(nextProps.scenes.user));
  //   } else {
  //     console.log("user length is " +nextProps.scenes.user.length)
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
        <SceneList scenes={scenes} user={user} handlers={{deleteScene: this.props.deleteScene}}/>
      </div>

    );
  }
}

UserHome.propTypes = {
  scenes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userScenes: PropTypes.array.isRequired
};

export default UserHome;
