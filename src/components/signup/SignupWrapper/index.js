import React, { Component } from "react";
import FirstStep from "components/signup/SignupSteps/index1";
import SecondStep from "components/signup/SignupSteps/index2";
import TeacherStep from "components/signup/SignupSteps/index3";
import FinalStep from "components/signup/SignupSteps/index4";
import { connect } from 'react-redux';
import * as userActions from 'redux/modules/user';
import * as walletActions from 'redux/modules/wallet';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router'



let fieldValues = {
    mail: "",
    passwd :"",
    name: "",
    sex: null,
    hp: "" ,
    birth: "",
    career: null,
    farm_addr: "",
    farm_num: "",
    farm_name: "" 
    }

class SignupWrapper extends Component {

    constructor() {
        super()

        this.state = {
            step: 1
          }
    }

    saveValues = (field_value) => {
        fieldValues =  Object.assign({}, fieldValues, field_value)
        console.log(fieldValues)
    }

    submitRegistration = async (type) => {
        console.log(type)
        const { UserActions, history, WalletActions } = this.props;

        try {
            console.log(fieldValues.passwd)
            await WalletActions.createWallet(fieldValues.passwd);
            console.log(this.props.newWalletInstance)
            const private_key = this.props.newWalletInstance.toJS().privateKey;
            const wallet = this.props.newWalletInstance.toJS().address;
            console.log(private_key)
            console.log(wallet)
            const key = 'blah';

            if(type === "teacher")
                await UserActions.signupFarmer({...fieldValues, private_key, wallet});
            else if(type === "student")
                await UserActions.signupStudent({...fieldValues, key, wallet});
            else 
                history.push('/notfound');
        } catch(e) {
            alert(e.response.data.message);
            history.push('/signup')
        }
        this.nextStep()
    }


    nextStep = () => {
        this.setState({
            step : this.state.step + 1
          })
    }

    previousStep = () => {
        this.setState({
            step : this.state.step - 1
            })
    }


    render() {
        const { step } = this.state;
        if(this.props.match.params.type === "teacher"){
            switch(step){
                case 1:
                return <FirstStep nextStep={this.nextStep} step={step} {...this.props}/>
                case 2:
                return <SecondStep saveValues={this.saveValues} fieldValues={fieldValues} nextStep={this.nextStep} step={step} previousStep={this.previousStep}/>
                case 3:
                return <TeacherStep saveValues={this.saveValues} submitRegistration={this.submitRegistration} fieldValues={fieldValues} step={step} nextStep={this.nextStep} previousStep={this.previousStep} type={this.props.match.params.type}/>
                case 4:
                return <FinalStep {...this.props}/>
                default:
                return <Redirect to='/notfound'/>
            }
        } else if(this.props.match.params.type === "student") {
            switch(step){
                case 1:
                return <FirstStep nextStep={this.nextStep} step={step} {...this.props}/>
                case 2:
                return <SecondStep saveValues={this.saveValues} fieldValues={fieldValues} nextStep={this.nextStep} submitRegistration={this.submitRegistration} step={step} previousStep={this.previousStep} type={this.props.match.params.type}/>
                case 3:
                return <FinalStep {...this.props}/>
                default:
                return <Redirect to='/notfound'/>
            }
        } else {
            return <Redirect to='/notfound'/>
        }
    }

};

export default connect(
    (state) => ({
        result: state.user.get('result'),
        walletInstance: state.wallet.get('walletInstance'),
        newWalletInstance: state.wallet.get('newWalletInstance')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        WalletActions: bindActionCreators(walletActions, dispatch),
    })
)(SignupWrapper);