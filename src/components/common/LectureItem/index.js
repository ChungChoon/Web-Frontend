import React, { Component } from 'react';
import styles from './styles.scss';
import Button from '@material-ui/core/Button'

class LectureItem extends Component {
    state = {
       evaluation: null 
    }

    componentDidMount() {
        const lecture_id = this.props.lecture_pk? parseInt(this.props.lecture_pk) : 0
        this.props.getLectureEvaluation(lecture_id).then(result => {
            this.setState({
                evaluation: result
            })
        });
    }

    render(){
        let button;
        const lecture_id = this.props.lecture_pk? parseInt(this.props.lecture_pk) : 0
        if(this.props.flag===10)
            button = <Button color="secondary" className={styles.price} onClick={() => (this.props.handlePay(lecture_id))}>지급</Button>
        else 
            button = <Button color="secondary" className={styles.price} onClick={() => (this.props.handleAttendance(lecture_id))}>출석체크</Button>
        return (
            <div className={styles.lectureItem}>
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    <div className={styles.header}>
                        <img className={styles.image} src={this.props.img || require("images/temp.jpeg")} alt="강의대표사진"/>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <div className={styles.lectureName}>{this.props.title}</div>
                            <div className={styles.location}>{this.props.place}</div>
                            <div className={styles.period}>
                                <span className={styles.detail}>{this.props.start_date.slice(0,10)}</span>
                                <span className={styles.detail}>{" "} ~ {" "}</span>
                                <span className={styles.detail}>{this.props.end_date.slice(0,10)}</span>
                            </div>
                            <div>{
                                    (() => {
                                        switch(this.props.kind){
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
                                    return null
                                        }
                                    })()
                            }</div>
                            
                        </div>
                        <div className={styles.end}>
                            <div className={styles.satisfaction}><div><span>{this.state.evaluation}{" "}</span> 강의평점</div></div>
                            <div>
                            {button}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
};


export default LectureItem;