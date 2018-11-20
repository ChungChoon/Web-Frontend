import React, { Component } from "react";
import Wallet from "./presenter";
import { cav } from 'klaytn/caver';
import { deployedABI } from 'lib/deployed/deployedABI';
import { deployedAddress } from 'lib/deployed/deployedAddress';

class Container extends Component {
    constructor(){
        super()
      
        this.mainContract = deployedABI
          && deployedAddress
          && new cav.klay.Contract(deployedABI, deployedAddress)

        this.state={
            balance: 0
        }
    }

    componentDidMount = () => {
        const walletInstance = sessionStorage.getItem('walletInstance') ? JSON.parse(sessionStorage.getItem('walletInstance')) : '';
        cav.klay.getBalance(walletInstance.address).then(result => 
            this.setState({
                balance: result/1000000000000000000
            })
        );
    }
    

    render() {
        const getBalance = this.state.balance
        const walletInstance = sessionStorage.getItem('walletInstance') ? JSON.parse(sessionStorage.getItem('walletInstance')) : '';
        return <Wallet walletInstance={walletInstance} getBalance={getBalance}/>;
    }
}

export default Container;