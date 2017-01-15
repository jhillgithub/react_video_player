import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YoutubeSearch from 'youtube-api-search'

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

    YoutubeSearch(
    {
      key: process.env.youtube_api_key,
      term: 'surfboards'
    },
    (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  };

  render() {
    return (
      <div>
        <SearchBar />
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
