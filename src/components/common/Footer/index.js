import React from 'react';
import styles from './styles.scss'

const Footer = (props, context) => (
    <footer className={styles.footer}>
    <div className={styles.wrapper}>
        <div className={styles.column}>
        <span className={styles.copyright}>Copyright ⓒ ChungChulEoRam. ALL RIGHTS RESERVED.</span>
        </div>
        <div className={styles.column}>
            <span className={styles.copyright}>
                <img src={require("images/img_logo_grey@2x.png")} alt="copyright"/>
            </span>
        </div>
        </div>
    </footer>
);

export default Footer;