import React, { Component } from 'react';
import styles from './styles.scss';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as lectureActions from 'redux/modules/lecture';

class AttendanceForm extends Component{
    state={
        user_list: []
    }
    componentDidMount(){
        this.getParticipants();
    }

    getParticipants = () => {
        const { LectureActions, match } = this.props;
        const token = sessionStorage.getItem('token')
        LectureActions.loadParticipantsInfo(token, match.params.id)
    }

    handleUserList = (e) => {
        const user_list = this.state.user_list
        let index
        
        if (e.target.checked) {
            user_list.push(+parseInt(e.target.value))
          } else {
            index = user_list.indexOf(+parseInt(e.target.value))
            user_list.splice(index, 1)
          }
            this.setState({ user_list: user_list })
    }

    handleAttendance = async() => {
        const { LectureActions, match, history } = this.props
        const token = sessionStorage.getItem('token')
        const lecture_id = match.params.id
        const attendants = this.state.user_list
        
        try{
            await LectureActions.checkAttendance({token, lecture_id, attendants})
        } catch(e){
            alert(e.response.statusText)
            history.push(`/lecture/${lecture_id}/attendants`)
        }
        alert('출석체크가 완료되었습니다.')
        history.push('/')
    }

    render() {
        let dt = new Date();
        const { allParticipants } = this.props;
        
        return(
            <div className={styles.attendanceForm}>
                <div className={styles.header}>
                    <h1 className={styles.date}>{dt.getFullYear()+'.'+(dt.getMonth()+1)+'.'+dt.getDate()}</h1>
                    <h1 className={styles.script}>오늘의<br /> 출석체크를 해주세요! </h1>
                </div>
                <div className={styles.center}>
                    <div className={styles.grid}>
                        <div className={styles.gridItem}>
                            <div className={styles.firstColumn}><span className={styles.gridHeader}>수강 학생</span></div>
                            <div className={styles.secondColumn}><span className={styles.gridHeader}>오늘 회차<span>06</span></span></div>
                            <div className={styles.thirdColumn}><span className={styles.gridHeader}>전체 횟수<span>10</span></span></div>
                        </div>
                        {
                        allParticipants.map((item) => {
                            return(
                            <div className={styles.gridItem} key={item.user_pk}>
                            <div className={styles.firstColumn}>
                            <img src={require("images/ic_people_orange64.png")} alt="수강생프로필"/>
                            <div>{item.name}</div>
                        </div>
                        <div className={styles.secondColumn}>
                            <Checkbox 
                            icon={<Icon className={styles.noCheck} fontSize="large">panorama_fish_eye</Icon>} 
                            checkedIcon={<Icon className={styles.check} fontSize="large">check_circle</Icon>} 
                            value={`${item.user_pk}`}
                            onClick={this.handleUserList}
                            color="primary" />
                        </div>
                        <div className={styles.thirdColumn}>
                            <div>6{" "}/{" "}10회</div>
                        </div>
                        </div>
                        )})
                        }            
                    </div>
                    <div className={styles.buttonWrapper} onClick={this.handleAttendance}><Button variant="contained" color="primary" fullWidth className={styles.button}>출석체크 완료</Button></div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        token: state.user.get('token'),
        allParticipants: state.lecture.get('allParticipants')
    }),
    (dispatch) => ({
        LectureActions: bindActionCreators(lectureActions, dispatch),
    })
)(AttendanceForm);