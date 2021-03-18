import React from 'react';
import './Test.css';

export class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.consoleLog = this.consoleLog.bind(this);
    };

    consoleLog() {
        console.log('it works');
    }
    render() {
        return (
            <div className='test'>
                <h1>TEST</h1>
                <button onClick={this.consoleLog} >Log to console</button>
            </div>
        )
    }
}
