import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.scss';

import Icon from '@material-ui/core/Icon';

const MypageAside = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
            <NavLink className={styles.link} activeClassName={styles.activeLink} to={`${props.match.url}/mylecture`}>
            <span>내 강의{"   "}</span>
            <Icon>arrow_drop_down</Icon>
            </NavLink>
            </div>
            
            <div className={styles.menu}>
            <NavLink className={styles.link} activeClassName={styles.activeLink} to={`${props.match.url}/myinfo`}>
            <span>계정 정보{"   "}</span>
            <Icon>arrow_drop_down</Icon>
            </NavLink></div>

            <div className={styles.menu}>
            <NavLink className={styles.link} activeClassName={styles.activeLink} to={`${props.match.url}/mywallet`
            }>
            <span>KLAY 내역{"   "}</span>
            <Icon>arrow_drop_down</Icon>
            </NavLink></div>
        </div>
    )
}

export default MypageAside;