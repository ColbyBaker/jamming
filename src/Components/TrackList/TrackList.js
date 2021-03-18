import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';


export class TrackList extends React.Component {
    render() {
    let output;
    if (this.props.tracks.length > 0) {
        output = this.props.tracks.map(track => {
            return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>})
    }
    return (
        <div className="TrackList">
            {output}
        </div>
    )
    }
};
