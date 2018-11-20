import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './styles.scss';

const LectureHeader = (props) => (
    <div className={styles.lectureHeader}>
        <div className={styles.container}>
        
        {
                (() => {
                    switch(props.kind){
            case 3: 
                return <Button className={styles.type}>금융</Button>
            case 4:
                return <Button className={styles.type}>법</Button>
            case 5: 
                return <Button className={styles.type}>농지</Button>
            case 6:
                return <Button className={styles.type}>유통</Button>
            case 7:
                return <Button className={styles.type}>마케팅</Button>
            case 8:
                return <Button className={styles.type}>화훼</Button>
            case 9: 
                return <Button className={styles.type}>채소</Button>
            case 10:
                return <Button className={styles.type}>과일</Button>
            case 11:
                return <Button className={styles.type}>농기구</Button>
            default:
                return <Button className={styles.type}>없음</Button>
                    }
                })()
        }
        <div className={styles.title}>강의이름</div>
        <div className={styles.name}>강사이름</div>
        </div>
    </div>
);

export default LectureHeader;