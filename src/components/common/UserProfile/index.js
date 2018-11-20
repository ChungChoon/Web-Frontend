import { connect } from "react-redux";
import Container from "./container";
import * as userActions from 'redux/modules/user';
import {bindActionCreators} from 'redux';


export default connect(
  (state) => ({
    isLoggedIn: state.user.get('isLoggedIn'),
    loginInfo: state.user.get('loginInfo')
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    // WalletActions: bindActionCreators(walletActions, dispatch)
  })
)(Container);