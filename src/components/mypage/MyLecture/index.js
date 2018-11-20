import React, { Component } from 'react';
import styles from './styles.scss';
import Icon from '@material-ui/core/Icon';
import LectureItem from "components/common/LectureItem";
import { connect } from "react-redux";
import * as lectureActions from 'redux/modules/lecture';
import {bindActionCreators} from 'redux';

import { cav } from 'klaytn/caver';
import { deployedABI } from 'lib/deployed/deployedABI';
import { deployedAddress } from 'lib/deployed/deployedAddress';

class MyLecture extends Component {
    constructor(){
        super()

        this.mainContract = deployedABI
            && deployedAddress
            && new cav.klay.Contract(deployedABI, deployedAddress)

        this.state={
            lecture: [],
            totalEval: 0
        }
    }

    componentDidMount() {
        const { LectureActions } = this.props;
        const token = sessionStorage.getItem('token');
        LectureActions.loadMyLecture(token);
    }

    handleAttendance = (id) => {
        this.props.history.push(`/lecture/${id}/attendance`)
    }

    calculateAvgEvaluation = () => {
        let sum=0

        for(let i=0; i<this.state.lecture.length; i++){
            sum += this.state.lecture[i];
        }
        
        this.setState({
            totalEval: sum/(this.state.lecture.length)
        })
    }

    getLectureEvaluation = async(lecture_pk) => {
        const address = JSON.parse(sessionStorage.getItem('walletInstance')).address

        return await this.mainContract.methods.calculateEvaluationAveragePoint(lecture_pk).call({
            from: address
        })
            .then(result => {
                this.setState({
                    lecture: [...this.state.lecture, result]
                  }, () => { 
                      return this.calculateAvgEvaluation()})
                return result})
            .catch(error => {
                this.setState({
                    lecture: [...this.state.lecture, 0]
                  }, () => { 
                    return this.calculateAvgEvaluation()})
                return 0
            })
    }

    // getLectureId = async (lectureNumber) => {
    //     await this.mainContract.methods.getLectureId(lectureNumber).call({
    //         from: this.state.address
    //     })
    //       .then(result => console.log(result))
    // }
    
    render() {
        return (
            <div className={styles.mylecture}>
                    <div className={styles.evalContainer}>
                        <div className={styles.evalHeader}><span>{this.props.myLectures.size}</span>개 강좌의 총 강의평가</div>
                        <div className={styles.evalContent}>
                            <div className={styles.circleContainer}>
                            <Icon className={styles.circle}>lens</Icon>
                            <Icon className={styles.circle}>lens</Icon>
                            <Icon className={styles.circle}>lens</Icon>
                            <Icon className={styles.circle}>lens</Icon>
                            <Icon className={styles.circle} style={{color: '#707070'}}>lens</Icon>
                            </div>
                            <div className={styles.percent}>{this.state.totalEval.toFixed(2)}</div>
                            <div className={styles.total}>/{" "}100</div>
                        </div>
                    </div>
                    <h2 className={styles.chooseMenu}>강의목록</h2>
                    <LectureList {...this.props} handleAttendance={this.handleAttendance} getLectureEvaluation={this.getLectureEvaluation}/>
                    </div>
        )
}
};

const LectureList = props => (
    <div className={styles.lecture}>
        {props.myLectures.map((item) => <LectureItem {...item} getLectureEvaluation={props.getLectureEvaluation} handleAttendance={props.handleAttendance} key={item.lecture_pk} />)}
    </div>
)


export default connect(
    (state) => ({
        token: state.user.get('token'),
        address: state.wallet.getIn(['walletInstance', 'address']),
        privateKey: state.wallet.getIn(['walletInstance', 'privateKey']),
        myLectures: state.lecture.get('myLectures')
    }),
    (dispatch) => ({
        LectureActions: bindActionCreators(lectureActions, dispatch),
    })
)(MyLecture);