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
    .then(responseToJson).then(function(data) { this.setState({ results: data }) });

  }

  handleChange(e) {

  }

  handleSubmit(e) {

  }

  render() {

    return(
      <div className="twitter-search">

        <SearchBar onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        <TwitterSearchResults tweets={this.state.results} />


      </div>
    )

  }


}

export default TwitterSearch;
