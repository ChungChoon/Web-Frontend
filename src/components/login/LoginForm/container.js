import React, { Component } from "react";
import LoginForm from "./presenter";


class Container extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          errors: {},
          mail: '',
          passwd: ''
          }
    };

    handleInputChange = e => {
        const { target : { value, name } } = e;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async () => {
        const { UserActions, history, WalletActions } = this.props;
        const { mail, passwd } = this.state;

        try {
            await UserActions.login({mail, passwd});
        
            const loggedInfo = this.props.result.toJS();
            sessionStorage.setItem('token', loggedInfo.token);
            await UserActions.setLoggedInfo(loggedInfo);
            sessionStorage.setItem('name', loggedInfo.data[0].name)

            await WalletActions.integrateWallet(loggedInfo.data[0].private_key)
            
            if(loggedInfo.data[0].flag === 10)
                history.push('/admin');
            else
            window.location.href = '/';
                // todo
        } catch (e) {
            console.log(e)
            alert('잘못된 계정정보입니다.');
        }
    }

    render() {
        const { mail, passwd, errors } = this.state;
        return (
            <LoginForm 
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            mailValue={mail} 
            passwdValue={passwd} 
            errors={errors}
            />
        )
    }
}

export default Container;