import { connect } from "react-redux";
import Container from "./container";
import { bindActionCreators } from 'redux';
import * as lectureActions from 'redux/modules/lecture';


export default connect(
    (state) => ({
        token: state.user.get('token'),
        walletInstance: state.wallet.get('walletInstance'),
    }),
    (dispatch) => ({
        LectureActions: bindActionCreators(lectureActions, dispatch),
    })
)(Container);