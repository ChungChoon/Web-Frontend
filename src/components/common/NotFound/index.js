import React from 'react';
import styles from './styles.scss';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const style = theme => ({
    button: {
      marginTop: '3rem',
      borderRadius: '20px'
    }
  });

const NotFound = (props) => {
    const { classes } = props;
    return(
    <div className={styles.notFound}>
        <h2>
        존재하지 않는 페이지입니다.
        </h2>
        <Button onClick={props.onGoBack} size="large" variant="outlined" color="primary" className={classes.button}>
        돌아가기
        </Button>
    </div>
    )
};

export default withStyles(style)(NotFound);