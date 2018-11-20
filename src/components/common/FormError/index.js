import React, {Component} from 'react';
import styles from './styles.scss';



class FormError extends Component{
    shouldComponentUpdate(nextProps) {
        return (this.props.error !== nextProps.error);
    }

    render() {
        return(
    <div className={styles.error}>
        {this.props.error}
    </div>
        )
    }
}

export default FormError;