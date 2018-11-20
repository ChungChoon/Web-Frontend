import { connect } from "react-redux";
import Container from "./container";
import { withRouter } from 'react-router-dom';
import * as userActions from 'redux/modules/user';
import {bindActionCreators} from 'redux';


export default withRouter(connect(
  (state) => {
    return {
    isLoggedIn: state.user.get('isLoggedIn'),
    loginInfo: state.user.get('loginInfo')
}},
(dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    // WalletActions: bindActionCreators(walletActions, dispatch)
})
)(Container));