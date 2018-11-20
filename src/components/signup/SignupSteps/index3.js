import React, { Component } from 'react';
import styles from './styles.scss';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const style = theme => ({
    icon: {
      margin: 0,
      padding: 0
    },
    formControlLabel: {
        fontSize: '1rem',
        fontWeight: '500'
    },
    button: {
        borderRadius: 0,
        margin: theme.spacing.unit,
        boxShadow: 'none'
    }
  });

class TeacherStep extends Component {

    constructor(props) {
        super(props);
        this.myInput = React.createRef();
        this.myReal = React.createRef();
        this.farm_name = React.createRef();
        this.farm_num = React.createRef();
        this.farm_addr = React.createRef();
        this.career = React.createRef();
      }

    _nextStep = (e) => {
        e.preventDefault()

        const data = {
            farm_name : this.farm_name.current.value,
            farm_num: this.farm_num.current.value,
            farm_addr: this.farm_addr.current.value,
            career: parseInt(this.career.current.value)
        }

        this.props.saveValues(data)
        this.props.submitRegistration(this.props.type)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={styles.thirdStep}>
            <div className={styles.step}>
                <Icon>lens</Icon>
                <div className={styles.stick}></div>
                <Icon>lens</Icon>
                <div className={styles.stick}></div>
                <Icon>lens</Icon>
            </div>
            <div className={styles.header}>농부 강사님의 <br/>정보를 입력해주세요:)</div>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <h5>농부 정보</h5>
                    <div className={styles.row}>
                        <label htmlFor="farmname"><b>농장 이름</b></label>
                        <input type="text" ref={this.farm_name} name="farmname" required />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="farminfo"><b>농장 정보</b></label>
                        <input type="text" ref={this.farm_num} name="farminfo" required />
                        <input type="button" className={styles.validate} value="인증하기" />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="farmaddress"><b>농장 주소</b></label>
                        <input type="text" ref={this.farm_addr} name="farmaddress" required />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="farmitem"><b>재배 품목</b></label>
                        <input type="text" name="farmitem" required />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="career"><b>농부 경력</b></label>
                        <input type="number" name="career" required ref={this.career} />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="farm_img"><b>농장 이미지</b></label>
                        <input type="text" ref={this.myInput} className={styles.fileInputTextbox} readOnly="readOnly"/>
                        <div className={styles.fileInputDiv}>
                            <input type="button" value="불러오기" className={styles.fileInputButton}/>
                            <input type="file" className={styles.hidden} ref={this.myReal} onChange={()=>{ this.myInput.current.value= this.myReal.current.value;}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.center}>
                <Button  
                    size="large"
                    variant="outlined" 
                    color="primary" 
                    className={classes.button} 
                    onClick={this.props.previousStep}>이전</Button>
                <Button  
                    size="large"
                    variant="contained" 
                    color="primary" 
                    className={classes.button} 
                    onClick={this._nextStep}>다음</Button>
            </div>
        </div>
        );
    }
}

export default withStyles(style)(TeacherStep);