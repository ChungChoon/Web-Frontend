import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styles from './styles.scss';
import MyLecture from 'components/mypage/MyLecture';
import MyInfo from 'components/mypage/MyInfo';
import MyWalletHistory from 'components/mypage/MyWalletHistory';
import MypageAside from 'components/mypage/MypageAside';

const MypageMain = (props) => {
    return (
        <div className={styles.mypage}>
        <div className={styles.container}>
            <div className={styles.column}>
                <h1 className={styles.navName}>마이페이지</h1>
                <MypageAside {...props}/>
            </div>
            <div className={styles.column} >
                <MypageRoute {...props}/>
            </div>
        </div>
        </div>
    )
}

const MypageRoute = (props) => (
    <>
        <Route exact path={props.match.url} render={()=> <Redirect to="mypage/mylecture"/>}/>
        <Route exact path={`${props.match.url}/mylecture`} component={MyLecture}/>
        <Route exact path={`${props.match.url}/myinfo`} component={MyInfo}/>
        <Route exact path={`${props.match.url}/mywallet`} component={MyWalletHistory}/>
    </>
)

export default MypageMain;