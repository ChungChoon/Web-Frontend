import React, { Component } from 'react';
import styles from './styles.scss';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const style = theme => ({
    Button: {
        borderRadius: '20px',
        marginTop: '1rem',
        width: '15%',
    }
})

const FinalStep = (props) => {
    const { classes } = props;

    return(
        <div className={styles.finalStep}>
            <div className={styles.header}>축하드려요 <br/>회원가입이 <br/>완료되었습니다 :)</div>
            <Button 
                onClick={()=>props.history.push('/login')} 
                className={classes.Button}
                variant="contained"
                color="primary"
                size="large">로그인하기
            </Button>
        </div>
    )
};

export default withStyles(style)(FinalStep);