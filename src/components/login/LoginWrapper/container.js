import React, { Component } from "react";
import LoginWrapper from './presenter';

class Container extends Component {

    render() {
        // const { action } = this.state;
        return <LoginWrapper {...this.props} />
    }
}

export default Container;