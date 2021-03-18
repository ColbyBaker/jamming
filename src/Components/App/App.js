import './App.css';
import React from 'react';
//import ReactDOM from 'react-dom';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Test } from '../Test/Test';
import Spotify from '../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Insert Name',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    } else {
      let newPlaylist = this.state.playlistTracks.concat(track);

      this.setState({
        playlistTracks: newPlaylist
      });
    };
  };

  removeTrack(track) {
    let newList = this.state.playlistTracks.filter(trackInPlaylist => trackInPlaylist.id !== track.id)
    this.setState({
      playlistTracks: newList
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  };

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks.map(track => track.uri));
    this.updatePlaylistName('Insert Name');
    this.setState({
      playlistTracks: []
    });
  };

  search(term) {
    Spotify.search(term).then(result => {
      this.setState({
        searchResults: result
      });
    });
  };


  render() {
    return (
      <div>
        <a href="/" style={{textDecoration: 'none'}}><h1>Ja<span className="highlight">mmm</span>ing</h1></a>
        <div className="App">
            <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}/>
              <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const lastSearch = window.sessionStorage.lastSearch;
    if (lastSearch) {
      window.sessionStorage.lastSearch = undefined;
      this.search(lastSearch);
    };
  };
};



export default App;