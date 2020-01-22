import React, { Component } from 'react';

class Success extends Component {
    constructor(props) {
        super(props);
        this.onClicking = this.onClicking.bind(this)
    }

    onClicking() {
        this.props.history.push("/")

    }
    render() {
        return (
            <div className="success">
                <center><img src={require('./tenor.gif')} height="100px"/></center>
                <h1 className="set">Details sent successfully to your Email</h1>
                <h5 className="set">Please Login again to continue</h5>
                <button className="btn btn-success set" onClick={() => this.onClicking()}>Continue to Login</button>

            </div>
        );
    }
}

export default Success;