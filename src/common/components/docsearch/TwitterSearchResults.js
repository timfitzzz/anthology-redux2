import React from 'react';
import { Component } from 'react';
import Tweet from 'react-tweet';

export default class TwitterSearchResults extends Component {


  constructor(props) {
    super(props)
    this.renderTweets = this.renderTweets.bind(this);
  }

  renderTweets() {

    var tweets = [];
    this.props.tweets.forEach(function(tweet) {
      tweets.push(<Tweet data={tweet}/>)
    })
    return tweets;

  }

  render() {

    return <div className="twitter-search-results">
                {this.props.tweets.length > 1 ? this.renderTweets() : "no tweets to show"}
                </div>

  }

}
