import React, { Component } from 'react';
import styles from './styles.scss';
import { NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import LectureItem from 'components/common/LectureItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as lectureActions from 'redux/modules/lecture';
 
class Admin extends Component{
    componentDidMount() {
        const { LectureActions, token } = this.props;
        LectureActions.loadAllLecture(token);
    }

    handlePay = (id) => {
        const { LectureActions, token } = this.props;
        LectureActions.givePay(token, id);
    }

    render(){
        return (
            <div className={styles.admin}>
        <div className={styles.container}>
            <div className={styles.column}>
                <h1 className={styles.navName}>어드민페이지</h1>
                <div className={styles.wrapper}>
                <div className={styles.menu}>
                <NavLink className={styles.link} activeClassName={styles.activeLink} to="/admin">
                <span>강의 목록{"   "}</span>
                <Icon>arrow_drop_down</Icon>
                </NavLink>
                </div>
            </div>
            </div>
            <div className={styles.column} >
                <h2 className={styles.chooseMenu}>강의평가 완료 강의 <span>{"3"}</span>개</h2>
                <LectureList {...this.props} handlePay={this.handlePay}/>
            </div>
        </div>
        </div>
        )
    }
}

const LectureList = props => (
    <div className={styles.lecture}>
        {props.allLectures.map((item, index) => <LectureItem {...item} handlePay={props.handlePay} flag={props.flag} key={index} />)}
    </div>
)

export default connect(
    (state) => ({
        token: state.user.get('token'),
        flag: state.user.getIn(['loginInfo', 'flag']),
        allLectures: state.lecture.get('allLectures'),
    }),
    (dispatch) => ({
        LectureActions: bindActionCreators(lectureActions, dispatch),
    })
)(Admin);