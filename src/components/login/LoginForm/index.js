import { connect } from "react-redux";
import Container from "./container";
import {bindActionCreators} from 'redux';
import * as userActions from 'redux/modules/user';
import * as walletActions from 'redux/modules/wallet';


export default connect(
    (state) => ({
        result: state.user.get('result'),
        loginInfo: state.user.get('loginInfo'),
        walletInstance: state.wallet.get('walletInstance')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        WalletActions: bindActionCreators(walletActions, dispatch)
    })
)(Container);