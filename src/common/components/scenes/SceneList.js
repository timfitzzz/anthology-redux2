import React from 'react';
import {Component} from 'react';


class SceneList extends Component {
  constructor(props) {
    super(props)
  }

  renderListItems() {
    var listItems = this.props.scenes.user.map( sceneId => {
      console.log("rendering " + this.props.scenes[sceneId].name);
      return(
        <div className="scene-list-item">
          <span className="list-item-title">{this.props.scenes[sceneId].name}</span>
          <span className="list-item-dates">{this.props.scenes[sceneId].firstDate ? this.props.scenes[sceneId].firstDate : ""}</span>
          <span className="list-item-created-at">{this.props.scenes[sceneId].created_at.toString() || "wait"}</span>
        </div>
      )
    });
    console.log(listItems);
    return listItems;
  }

  render() {
    if (this.props.scenes.user.length > 0) {
      return <div className="scene-list">{this.renderListItems()}</div>
    } else {
      return <div className="scene-list empty">You have no scenes yet!</div>
    }

  }

}

export default SceneList;
