import React, { Component } from 'react';
import SearchBar from 'react-search-bar';
import TwitterSearchResults from './TwitterSearchResults.js';

class TwitterSearch extends Component {


  constructor(props) {
    super(props)
    this.state = {
      view: 'default', // || 'search' || 'home' || 'hashtag' || 'user' || 'list'
      results: [],
      search_box_contents: ''
    }
    this.getOwnRecents = this.getOwnRecents.bind(this);
  }

  componentDidMount() {
  }

  getOwnRecents() {
    fetch('http://127.0.0.1:3002/twitter/getOwnRecents', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
    .then(responseToJson).then(function(data) { 
      console.log('recents retrieved'); 
      this.setState({ results: data }) 
    });

  }

  handleChange(e) {

  }

  handleSubmit(e) {

  }

  render() {

    return(
      <div className="twitter-search">

        <SearchBar onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        <button onClick={this.getOwnRecents}>load tweets</button>
        <TwitterSearchResults tweets={this.state.results} />


      </div>
    )

  }


}

export default TwitterSearch;
