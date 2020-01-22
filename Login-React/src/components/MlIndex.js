import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class MlIndex extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        let loggedIn = true

        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn
        }

    }

    handleLogOut() {
        localStorage.clear()
        this.props.history.push("/")
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <iframe width="1420" height="700" title="mlchat" src="http://127.0.0.1:5000/">
                </iframe>
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
                    <img src={require('./Hey_Machine_Learning_Logo.png')} height="70px" className="rotate"/>
                    <h1 style={{ float: "right", marginLeft: '5%' ,color: 'grey'  }}>Welcome</h1>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-outline-success my-2 my-sm-0 pull-right" onClick={() => this.handleLogOut()} style={{ float: "right", marginLeft: '1500%' }}>Logout</button>
                            
                        </form>
                    </div>
                </nav>

            </div>
        );
    }
}

export default MlIndex;