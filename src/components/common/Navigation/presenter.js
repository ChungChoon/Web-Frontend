import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { NavLink, Link } from "react-router-dom";
import UserProfile from "components/common/UserProfile";
import { connect } from "react-redux";

const Navigation = props => {
    console.log(props.isLoggedIn);
    return (
     <div className={styles.navigation}>
        <div className={styles.inner}>
            <div className={styles.column}>
                <div className={styles.logo}>
                    <Link to="/about" className={styles.link}>
                        <img src={require("images/img_logo_blue@3x.png")} alt="청출어람 로고"/>
                    </Link>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.menu}>
                    <NavLink to="/about" className={styles.link} activeClassName={styles.activeLink}>소개</NavLink>
                </div>
                <div className={styles.menu}>
                    <NavLink to="/register" className={styles.link} activeClassName={styles.activeLink}>강의등록</NavLink> 
                </div>
                <div className={styles.menu}>
                    <NavLink to="/mypage" className={styles.link} activeClassName={styles.activeLink}>마이페이지</NavLink>
                </div>
            </div>
            <div className={styles.column}>
                {props.isLoggedIn? <div className={styles.logoutLink} onClick={props.handleLogout}>로그아웃</div> : null}
                <UserPart {...props}/>
            </div>
        </div>
    </div>
    )
};

const UserPart = (props) => {
return props.isLoggedIn ? <UserProfile /> : <PublicDefault />
}

UserPart.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

const PublicDefault = (props) => (
    <>
                <div className={styles.menu}>
                    <NavLink to="/login" className={styles.link} activeClassName={styles.activeLink}>로그인</NavLink>
                </div>
                <div className={styles.menu}>
                    <NavLink to="/signup" className={styles.link}>
                        <div className={styles.signup}>
                            회원가입
                        </div>
                    </NavLink>
                </div>
    </>
);

export default Navigation;