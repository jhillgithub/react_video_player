import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YoutubeSearch from 'youtube-api-search'
import _ from 'lodash';

import SearchBar from './components/search_bar.jsx';
import VideoList from './components/video_list.jsx';
import VideoDetails from './components/video_details.jsx';


// Create a new component. This compoent shoudl produce some html.
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');

  };

  videoSearch(term) {
    YoutubeSearch(
    {
      key: process.env.youtube_api_key,
      term: term
    },
    (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  };

  render() {
    const videoSearch = _.debounce((term) => { this.videoSarch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={term => videoSearch(term)} />
        <VideoDetails video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    )
  }
}


// Take this component's generated HTML and put it in the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
