import React, { Component } from 'react';
import styles from './styles.scss';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as userActions from 'redux/modules/user';
import {isEmail, isLength} from 'validator';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import FormError from 'components/common/FormError';



const style = theme => ({
    icon: {
      margin: 0,
      padding: 0
    },
    button: {
        borderRadius: 0,
        margin: theme.spacing.unit,
        boxShadow: 'none'
    }
  });

class SecondStep extends Component {

    constructor(props) {
        super(props);
        this.myInput = React.createRef();
        this.myReal = React.createRef();
        this.mail = React.createRef();
        this.passwd = React.createRef();
        this.passwd2 = React.createRef();
        this.name = React.createRef();
        this.sex1 = React.createRef();
        this.sex2 = React.createRef();
        this.birth_year = React.createRef();
        this.birth_month = React.createRef();
        this.birth_day = React.createRef();
        this.hp1 = React.createRef();
        this.hp2 = React.createRef();
        this.hp3 = React.createRef();
      }

      onChange = (e) => {
        const { name, value } = e.target;
        if(name !== 'mail') {
            this.setError(null)
        }
      }

    _nextStep = (e) => {
        const { validate } = this;
        const { error, duplication, type } = this.props;
        e.preventDefault()

        const data = {
            name : this.name.current.value,
            passwd : this.passwd.current.value,
            mail : this.mail.current.value,
            sex : this.sex2.current.value ? parseInt(this.sex2.current.value) : parseInt(this.sex1.current.value),
            birth: this.birth_year.current.value + "-" + this.birth_month.current.value + "-" +this.birth_day.current.value,
            hp: this.hp1.current.value + "-" + this.hp2.current.value + "-" +this.hp3.current.value
        }

        if(!data.name|| !data.passwd || !data.mail || !data.sex || !data.birth || !data.hp){
            this.setError('입력되지 않은 항목이 있습니다');
            return;
        }

        if(!duplication){
            this.setError('이메일 중복을 확인해주세요');
            return;
        }

        if(error) return;

        if(!validate['mail'](this.mail.current.value) 
            || !validate['password'](this.mail.current.value) 
            || !validate['passwordConfirm'](this.passwd2.current.value)) { 
            return;
        }
    
        this.props.saveValues(data)
        if(type === "student")
            this.props.submitRegistration(type)
        else
            this.props.nextStep()
    }


    checkEmailDuplication = async () => {
        const { UserActions } = this.props;
        const mail = this.mail.current.value;
        try {
            await UserActions.checkEmailDuplication(mail);
            // console.log(this.props.duplication);
            if(this.props.duplication === 'duplication') {
                this.setError('이미 존재하는 이메일입니다.');
            } else {
                this.setError(null);
                alert('사용가능합니다.')
            }
        } catch (e) {
            console.log(e);
        }
    }

    setError = (message) => {
        const { UserActions } = this.props;
        UserActions.setError({
            location: 'signup',
            message
        })
    }

    validate = {
        mail: (value) => {
            if(!isEmail(value)) {
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if(!isLength(value, { min: 6 })) {
                this.setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            return true;
        },
        passwordConfirm: (value) => {
            if(this.passwd.current.value !== value) {
                this.setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            return true;
        }
    }

    render() {
        const { classes, error } = this.props;
        return (
            <div className={styles.secondStep}>
            <div className={styles.step}>
                <Icon>lens</Icon>
                <div className={styles.stick}></div>
                <Icon>lens</Icon>
                <div className={styles.stick}></div>
                <Icon>panorama_fish_eye</Icon>
            </div>
            <div className={styles.header}>회원정보를<br/> 입력해주세요:)</div>
            <FormControl component="fieldset" className={styles.wrapper}>
                <div className={styles.form}>
                    <h5>회원정보</h5>
                    <div className={styles.row}>
                        <label htmlFor="name"><b>이름</b></label>
                        <input type="text" ref={this.name} name="name" required onChange={this.onChange}/>
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="mail"><b>이메일</b></label>
                        <input type="email" ref={this.mail} name="mail" required/>
                        <button className={styles.duplicate} onClick={this.checkEmailDuplication}>중복확인</button>
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="passwd" ><b>비밀번호</b></label>
                        <input type="password" ref={this.passwd} name="passwd" required onChange={this.onChange}/>
                        <div className={styles.warning}> 8-15자리의 영문/숫자/특수문자를 함께 입력해주세요</div>
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="passwd2"><b>비밀번호 확인</b></label>
                        <input type="password" name="passwd2" ref={this.passwd2} required onChange={this.onChange}/>
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="hp1"><b>휴대폰 번호</b></label>
                        <input type="number" ref={this.hp1} name="hp1" required onChange={this.onChange}/>
                        <input type="number" ref={this.hp2} name="hp2" required onChange={this.onChange}/>
                        <input type="number" ref={this.hp3} name="hp3" required onChange={this.onChange}/>
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="birth"><b>생년월일</b></label>
                        <input type="number"  name="birth_year" ref={this.birth_year} required onChange={this.onChange}/>
                        <input type="number"  name="birth_month" ref={this.birth_month} required onChange={this.onChange}/>
                        <input type="number" name="birth_day" ref={this.birth_day} required onChange={this.onChange}/>
                    </div>

                    <div className={styles.row}>
                        <label htmlFor="sex"><b>성별</b></label>
                        <div className={styles.column}>
                        <label className={styles.container2}>여자
                        <input type="radio" value="2" ref={this.sex2} name="sex" onChange={this.onChange}/>
                        <span className={styles.checkmark2}></span>
                        </label>
                        <label className={styles.container2}>남자
                        <input type="radio" value="1" ref={this.sex1} name="sex" onChange={this.onChange}/>
                        <span className={styles.checkmark2}></span>
                        </label>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="profile_img"><b>프로필 사진</b></label>
                        <input type="text" ref={this.myInput} className={styles.fileInputTextbox} readOnly="readOnly"/>
                        <div className={styles.fileInputDiv}>
                            <input type="button" value="불러오기" className={styles.fileInputButton}/>
                            <input type="file" className={styles.hidden} ref={this.myReal} onChange={()=>{ this.myInput.current.value= this.myReal.current.value;}}/>
                        </div>
                    </div>
                </div>
            </FormControl>
            {
                error && <FormError error={error} />
            }
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

export default withStyles(style)(
    connect(
        (state) => ({
            error: state.user.getIn(['signup', 'error']),
            duplication: state.user.getIn(['signup', 'duplication']),
            result: state.user.get('result')
        }),
        (dispatch) => ({
            UserActions: bindActionCreators(userActions, dispatch)
        })
    )(SecondStep));

