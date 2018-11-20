import React, { Component } from 'react';
import styles from './styles.scss';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormError from 'components/common/FormError';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'redux/modules/user';



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

class FirstStep extends Component {
    state = {
        total: true,
        require: true,
        optional: true,
    };

    handleChange = name => event => {
        if(name === "total")
            this.setState({ require: true, optional: true, total: true });
        else if(name !== "total" && event.target.checked === false)
            this.setState({total: false, [name]: event.target.checked})  
        else if(name === 'require' && event.target.checked === true){
            this.setState({require: false , [name]: event.target.checked})
            this.setError(null)
        }
        else
            this.setState({ [name]: event.target.checked });
    };

    _nextStep = (e) => {
        if(!this.state.require){
            this.setError('필수 약관에 동의해주세요.')
            return;
        }

        this.setError(null)
        this.props.nextStep()
    }

    setError = (message) => {
        const { UserActions } = this.props;
        UserActions.setError({
            location: 'signup',
            message
        })
    }
    
    render() {
        const { classes, history, error } = this.props;
        const { total, require, optional } = this.state;
        return (
            <div className={styles.firstStep}>
                <div className={styles.step}>
                    <Icon>lens</Icon>
                    <div className={styles.stick}></div>
                    <Icon>panorama_fish_eye</Icon>
                    <div className={styles.stick}></div>
                    <Icon>panorama_fish_eye</Icon>
                </div>
                <div className={styles.header}>회원가입을 위해<br/> 약관에 동의해주세요!</div>
                <FormControl component="fieldset" className={styles.wrapper}>
                    <div className={styles.terms}>
                        <h4>약관</h4>
                        <div>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={total} 
                                    color="primary" 
                                    icon={<Icon className={classes.icon} fontSize="large">panorama_fish_eye</Icon>} 
                                    checkedIcon={<Icon className={classes.icon} fontSize="large">check_circle</Icon>} 
                                    value="total" 
                                    onChange={this.handleChange('total')}
                                    />
                            }
                            className={classes.formControlLabel}
                            label="전체 동의"/>
                        </div>
                        <h5>청출어람</h5>
                        <div className={styles.row}>
                        <FormControlLabel
                            className={classes.formControlLabel}
                            control={
                                <Checkbox 
                                    checked={require} 
                                    color="primary" 
                                    icon={<Icon className={classes.icon} fontSize="large">panorama_fish_eye</Icon>} 
                                    checkedIcon={<Icon className={classes.icon} fontSize="large">check_circle</Icon>} 
                                    value="require" 
                                    onChange={this.handleChange('require')}
                                    />
                            }
                            label="개인정보 수집 및 사용 동의 (필수)"/>
                            <span className={styles.detail}>자세히</span>
                        </div>
                        <div className={styles.row}>
                        <FormControlLabel
                            className={classes.formControlLabel}
                            control={
                                <Checkbox 
                                    checked={optional} 
                                    color="primary" 
                                    icon={<Icon className={classes.icon} fontSize="large">panorama_fish_eye</Icon>} 
                                    checkedIcon={<Icon className={classes.icon} fontSize="large">check_circle</Icon>} 
                                    value="optional" 
                                    onChange={this.handleChange('optional')}
                                    />
                            }
                            label="블록체인 어쩌구 동의 (선택)"/>
                            <span className={styles.detail}>자세히</span>
                        </div>
                        <p>선택항목에 동의하지 않으셔도 정상적인 서비스를 이용할 수 있습니다.</p>
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
                        onClick={()=>history.push('/signup')}>이전</Button>
                    <Button  
                        size="large"
                        variant="contained" 
                        color="primary" 
                        className={classes.button} 
                        onClick={this._nextStep}>다음</Button>
                </div>
            </div>
        )
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
    )(FirstStep));