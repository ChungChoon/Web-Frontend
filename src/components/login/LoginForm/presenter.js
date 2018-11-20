import React from 'react';
import PropTypers from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';

const style = theme => ({
    inputBase: {
        padding: '.5rem',
        backgroundColor: grey[200],
        minHeight: '2rem',
        width: '90%',
        marginTop: '1rem'
    },
    Button: {
        borderRadius: '20px',
        marginTop: '1rem'
    }
})

class LoginForm extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <form>
                <InputBase 
                    fullWidth
                    name="mail"
                    className={classes.inputBase} 
                    placeholder="메일"
                    value={this.props.mailValue}
                    onChange={this.props.handleInputChange}
                    required
                    type="email" />
                <InputBase 
                    fullWidth 
                    name="passwd"
                    className={classes.inputBase} 
                    placeholder="비밀번호"
                    type="password"
                    required
                    value={this.props.passwdValue}
                    onChange={this.props.handleInputChange} />
                <Button 
                    onClick={this.props.handleSubmit} 
                    className={classes.Button}
                    variant="contained"
                    color="primary"
                    size="large">로그인하기</Button>
            </form>
        )
    }
};

LoginForm.propTypes= {
    // mailValue: PropTypes.string.isRequired,
    // passwdValue: PropTypes.string.isRequired,
    // handleInputChange: PropTypes.func.isRequired,
    // handleSubmit: PropTypes.func.isRequired
}

export default withStyles(style)(LoginForm);