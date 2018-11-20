import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';


const SignupType = (props) => (
    <section className={styles.signup}>
        <h1 className={styles.h1}>회원가입</h1>
        <div className={styles.content}>
            <div className={styles.column}>
                <Link to="/signup/teacher">
                    <img src={require("images/img_nongbu.png")} className={styles.type} alt="강사로 가입하기"/>
                </Link>
            </div>
            <div className={styles.column}>
                <Link to="/signup/student">
                    <img src={require("images/img_sukang.png")} className={styles.type} alt="수강생으로 가입하기"/>
                </Link>        
            </div>
        </div>
    </section>
);

export default connect()(SignupType);