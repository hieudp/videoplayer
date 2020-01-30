import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchbar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/videolist';
import VideoDetail from './components/videodetail';

const API_KEY = 'AIzaSyBV9q8QmOwk_ed4Q6dV_heJNYUmmV9STe0';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null    
        }
        this.videoSearch('surfboard')
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            })
        })
    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
            )
    }
};

ReactDOM.render(<App />, document.querySelector('.container'));