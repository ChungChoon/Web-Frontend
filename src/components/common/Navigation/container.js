import React, { Component } from "react";
import Navigation from "./presenter";

class Container extends Component {
    handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('walletInstance');
        window.location.href = '/';
    }

    render() {
        return <Navigation {...this.props} handleLogout={this.handleLogout}/>
    }
}

export default Container;