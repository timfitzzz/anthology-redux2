import React, {Component} from 'react';
import SceneActions from '../../actions/scenes';

class UserHomeControls extends Component {

  constructor(props) {
    super(props);
    console.log(!this.props.createScene ? "no createScene bro" : "createScene is here dammit");
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      new_scene_name: ""
    }
  }

  render() {
    var that = this;
    return <div className="input-group">
      <input
        value={this.state.new_scene_name}
        onChange={this.handleInputChange.bind(this)}
        placeholder="New scene name"
        type="text"
        className="form-control"/>
      <span className="input-group-btn">
        <button
          className="btn-default btn"
          type="button"
          onClick={this.handleClick}>
        New Scene
        </button>
      </span>
      </div>
  }

  handleInputChange(e) {
    this.setState({
      new_scene_name: e.target.value
    });
  }

  handleClick(e) {
    //console.log(this.props);
    var that = this;
    console.log(this.state);
    this.props.createScene("", that.state.new_scene_name);
  }

}

export default UserHomeControls;
