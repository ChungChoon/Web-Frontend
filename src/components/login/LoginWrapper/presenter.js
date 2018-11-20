import React from "react";
import styles from "./styles.scss";
import LoginForm from "components/login/LoginForm";
import { Link } from "react-router-dom";


const text = 
`청출어람은 성공적인 귀농귀촌 교육을 위한 플랫폼입니다.
블록체인을 기반으로 평점에 따라 수수료를 인센티브로 차등지급하고,
신뢰성있는 평가와 피드백을 열람할 수 있도록 합니다.
청출어람에서는 농부님들과 귀농귀촌을 원하는 누구나 
새롭고 신뢰성있는 경험을 할 수 있습니다.
`


const LoginWrapper = (props) => (
    <section className={styles.login}>
    <h1 className={styles.h1}>로그인</h1>
    <div className={styles.content}>
        <div className={styles.column}>
            <LoginForm {...props}/>
        </div>
        <div className={styles.column}>
            <p className={styles.p}>{text}</p>
            <Link to='/signup' className={styles.signup}>회원가입하기{" "} &gt;</Link>
        </div>
    </div>
    </section>
);

export default LoginWrapper;