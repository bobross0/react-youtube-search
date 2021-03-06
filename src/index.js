import React, { Component } from 'react';
import './index.css';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import searchYoutube from 'youtube-api-v3-search';
// import * as serviceWorker from './serviceWorker';
import SearchBar from './components/search/search_bar';
import VideoList from './components/video/video_list';
import VideoDetail from './components/video/video_detail';

const API_KEY = 'AIzaSyCrI0kwNS07VIBB006Rhu5WuI-9hZPoYD4';
const options = {
    q: '',
    part: 'snippet',
    type: 'video'
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
            isOpenMenu: false
        };

        this.videoSearch(options);
    }

    videoSearch(keyword) {
        options.q = keyword;

        searchYoutube(API_KEY, options).then((videos) => {
            const items = videos.items.concat(videos.items, videos.items, videos.items, videos.items);

            this.setState({
                videos: items.concat([]),
                selectedVideo: items[0]
            });
        });
    }

    onClickMenuBar = (isOpenMenu) => {
        this.setState({ isOpenMenu });
    }

    /**
     * 상위 컴포넌트에 이벤트 전달하는 방식
     * 1. Callback Function 전달
     * 2. Props로 접근
     */

    render() {
        // const videoSearch = _.debounce((keyword) => {
        //     this.videoSearch(keyword)
        // }, 500);

        // const videoSearch = ((keyword) => {
        //     setTimeout(() => {
        //         this.videoSearch(keyword);
        //     }, 3000);
        // });

        const menuBarClass = this.state.isOpenMenu ? '' : 'close';

        return (
            <div style={{ paddingTop: ' 55px' }}>
                <SearchBar
                    isOpenMenu={this.state.isOpenMenu}
                    onChangeKeyword={(keyword) => {
                        this.videoSearch(keyword);
                    }}
                    onClickMenuBar={this.onClickMenuBar}
                />
                <VideoDetail
                    video={(this.state.selectedVideo)}
                />
                <VideoList
                    onVideoSelect={(selectedVideo) => {
                        this.setState({ selectedVideo });
                    }}
                    videos={this.state.videos}
                />

                <div className={`menuBar ${menuBarClass}`}> 좋아요 목록 </div>
            </div >
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
// serviceWorker.unregister();
