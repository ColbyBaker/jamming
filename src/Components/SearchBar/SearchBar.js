import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
  }

  search(e) {
    this.props.onSearch(this.state.term)
  }

  enterSearch(e) {
    if (e.keyCode === 13) {
      this.search(e);
    }
  }

  handleTermChange(e) {
    this.setState ({
      term: e.target.value
    })
  }

  render() {
    return(
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onKeyUp={this.enterSearch} placeholder="Enter A Song, Album, or Artist" />
        <button onClick={this.search} className="SearchButton">SEARCH</button>
      </div>

    );
  };
};


