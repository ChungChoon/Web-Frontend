import React, { Component } from 'react';
import styles from './styles.scss';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import * as lectureActions from 'redux/modules/lecture';
import { cav } from 'klaytn/caver';
import { deployedABI } from 'lib/deployed/deployedABI';
import { deployedAddress } from 'lib/deployed/deployedAddress';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const style = theme => ({
    button: {
        borderRadius: 0,
        boxShadow: 'none',
        padding: '1rem',
    }
  });

class Register extends Component {
    constructor(){
        super()
        
        this.mainContract = deployedABI
            && deployedAddress
            && new cav.klay.Contract(deployedABI, deployedAddress)

        this.state = {
            type: '',
            curri_title: [''],
            curri_content: [''],
            address: JSON.parse(sessionStorage.getItem('walletInstance')).address,
            lecture_nb: null
        }
    }

    handleTypeChange = event => {
        const { target: { value, name } } = event;
        this.setState({
          [name]: value
        }); 
    };
    
    handleChange = (e) => {
        const { LectureActions } = this.props;
        const { name, value } = e.target;

        LectureActions.changeInput({
            name,
            value
        });
    }

    sendTransaction = async (cost) => {

        await this.mainContract.methods.createLecture(cost).send({
            from: this.state.address,
            gas: '300000',
          })
            .on('transactionHash', console.log)
            .on('receipt', function(receipt) {
                this.setState({
                    lecture_nb: receipt.events.CreatingLecture.returnValues['lectureNumber']
                })

              })
            .on('error', console.log)
    }

    handleSubmit = async () => {
        const { LectureActions, writeLecture } = this.props;
        const { curri_title, curri_content } = this.state;
        const { title, start_date, end_date, place, intro, price, limit_num } = writeLecture.toJS();
        const target = parseInt(writeLecture.toJS().target);
        const kind = parseInt(writeLecture.toJS().kind);
        const period = parseInt(writeLecture.toJS().period);
        const curri_count = curri_title.length;
        const lecture_bn = 7; // 김농부로 7까지 보냈음
        const token = sessionStorage.getItem('token');
        
        await this.sendTransaction(price);

        try {
            await LectureActions.registerLecture({ token, lecture_bn, title, target, kind, period, start_date, end_date, place, curri_title, curri_content, intro, price, limit_num, curri_count });
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    handleCurriTitle = (e) => {
          let curri_title = [...this.state.curri_title];
            curri_title[e.target.dataset.id] = e.target.value
          this.setState({ curri_title }, () => console.log(this.state.curri_title))
    }

    handleCurriContent = (e) => {
        let curri_content = [...this.state.curri_content];
        curri_content[e.target.dataset.id] = e.target.value
        this.setState({ curri_content }, () => console.log(this.state.curri_content))
    }

    addCurri = (e) => {
        this.setState((prevState) => ({
            curri_title: [...prevState.curri_title, ''],
            curri_content: [...prevState.curri_content, ''],
        }));
    }

    render() {
        const {title, target, kind, period, start_date, end_date, place, intro, price, limit_num} = this.props.writeLecture.toJS();
        const {classes, history } = this.props;
        const {type, curri_title, curri_content } = this.state
        const token = sessionStorage.getItem('token')
        const address = sessionStorage.getItem('walletInstance')

        if(!(token&&address)){
            alert('로그인이 필요합니다!');
            history.push('/')
            return null
        }

        return(
        <div className={styles.register}>
            <header className={styles.header}>
                <h1>개설하려고 하는 <br/>강의의 상세 내용을 <br/> 입력해주세요.</h1>
            </header>
            <section className={styles.container}>
                <form className={styles.form} >
                    <div className={styles.row}>
                    <div>
                    <label htmlFor="title">강의명</label>
                    <span className={styles.des}>강의 제목을 입력해주세요.</span>
                    </div>
                    <div className={styles.underline}>
                    <input className={styles.input} type="text"  
                    onChange={this.handleChange} value={title || ''} name="title"/>
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div>
                    <label htmlFor="target">강의대상</label>
                    <span className={styles.des}>대상무관, 여성, 청소년 중 해당 사항을 선택해주세요.</span>
                    </div>
                    <div className={styles.underline}>
                    <select className={styles.input} name="target" value={target || ''} onChange={this.handleChange}>
                        <option disabled value=""></option>
                        <option value="1">대상무관</option>
                        <option value="15">여성</option>
                        <option value="16">청소년</option>
                    </select>
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div>
                    <label htmlFor="type">강의방식</label>
                    <span className={styles.des}>강의방식 및 상세종류를 선택해주세요.</span>
                    </div>
                    <div className={styles.underline}>
                    <select className={styles.input} name="type" value={type || ''} onChange={this.handleTypeChange}>
                        <option disabled value=""></option>
                        <option value="basic">이론</option>
                        <option value="practice">실습</option>
                    </select>
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div className={styles.underline}>
                    <select className={styles.input} name="kind" value={kind || ''} onChange={this.handleChange}>
                        <option disabled value=""></option>
                        {(type === "basic") 
                            ? 
                            basictype.map(item => (
                                <option value={item.id} key={item.id}>{item.content}</option>
                            ))
                            : 
                            practicetype.map(item => (
                                <option value={item.id} key={item.id}>{item.content}</option>
                        ))}
                    </select>
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div>
                    <label htmlFor="period">강의기간</label>
                    <span className={styles.des}>주말, 단기, 장기중에 해당사항을 입력해주세요</span>
                    </div>                
                    <div className={styles.underline}>
                    <select className={styles.input} name="period" onChange={this.handleChange} value={period || ''}>
                        <option disabled value=""></option>
                        <option value="12">주말</option>
                        <option value="13">단기</option>
                        <option value="14">장기</option>
                    </select>
                    </div>
                    </div>
                    
                    <div className={styles.row}>
                    <div>
                    <label>강의날짜</label>
                    <span className={styles.des}>강의의 시작날짜와 종료날짜를 입력해주세요.</span>
                    </div>                
                    <div className={styles.date}>
                    <input name="start_date" className={styles.input} onChange={this.handleChange} value={start_date || ''} type="date" />
                    <span>~</span>
                    <input name="end_date" className={styles.input} onChange={this.handleChange} value={end_date || ''} type="date" />
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div>
                    <label htmlFor="place">강의장소</label>
                    <span className={styles.des}>강의가 진행되는 장소를 입력해주세요.</span>
                    </div>                
                    <div className={styles.underline}>
                    <input name="place" className={styles.input} type="text" onChange={this.handleChange} value={place || ''}/>
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div>
                    <label htmlFor="limit_num">수강인원</label>
                    <span className={styles.des}>강의의 최대 수강 가능 인원을 지정해주세요.</span>
                    </div>                
                    <div className={styles.underline}>
                    <Icon >add_circle_outline</Icon>
                    <input name="limit_num" className={styles.num} type="number"  onChange={this.handleChange} value={limit_num || ''}/>
                    <Icon >remove_circle_outline</Icon>
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div>
                    <label htmlFor="intro">강의소개</label>
                    <span className={styles.des}>강의의 목적과 필요성에 대해 입력해주세요.</span>
                    </div>                
                    <div className={styles.underline}>
                    <input name="intro" className={styles.input} type="text" onChange={this.handleChange} value={intro || ''}/>
                    </div>
                    </div>

                    <div className={styles.row}>
                    <div>
                    <label htmlFor="curriculum">강의일정</label>
                    <span className={styles.des}>강의 커리큘럼에 대해 작성해주세요.</span>
                    </div>                
                    <div className={styles.underline}>
                         <div className={styles.form}>
                         {
                            curri_title.map((val, idx) => 
                            {
                                let titleId = `curri_title-${idx}`, contentId = `curri_content-${idx}`;
                                return (
                                <div key={idx}>
                                    <label htmlFor={titleId}>{`${idx + 1}주차: `}</label>
                                    <input
                                    type="text"
                                    name={titleId}
                                    data-id={idx}
                                    id={titleId}
                                    value={curri_title[idx]} 
                                    className="curri_title"
                                    onChange={this.handleCurriTitle}
                                    />
                                    <label htmlFor={contentId}>내용: </label>
                                    <input
                                    type="text"
                                    name={contentId}
                                    data-id={idx}
                                    id={contentId}
                                    value={curri_content[idx]} 
                                    className="curri_content"
                                    onChange={this.handleCurriContent}
                                    />
                                </div>)
                            })
                        }   
                        </div> 
                    <div className={styles.column}>
                    <div onClick={this.addCurri}><Icon >add_circle_outline</Icon></div>
                    </div>
                    </div>
                    </div>


                    <div className={styles.row}>
                    <div>
                    <label htmlFor="price">수강료</label>
                    <span className={styles.des}>강의 금액을 지정해주세요. 단위 klay</span>
                    </div>                
                    <div className={styles.underline}>
                    <input name="price" className={styles.input} type="number" onChange={this.handleChange} value={price || ''}/>
                    </div>
                    </div>

                    <div className={styles.row}>
                        <Button fullWidth className={classes.button} variant="contained" color="primary" onClick={this.handleSubmit}>등록하기</Button>
                    </div>
                </form>
            </section>
            </div>
        )
    }
};

const basictype = [
    {id: 3, content: "금융"},
    {id: 4, content: "법"},
    {id: 5, content: "농지"},
    {id: 6, content: "유통"},
    {id: 7, content: "마케팅"},
]

const practicetype = [
    {id: 8, content: "화훼"},
    {id: 9, content: "채소"},
    {id: 10, content: "과일"},
    {id: 11, content: "농기구"},
]

export default withStyles(style)(
    connect(
    (state) => ({
        writeLecture: state.lecture.get('writeLecture'),
        token: state.user.get('token'),
        address: state.wallet.getIn(['walletInstance', 'address']),
        privateKey: state.wallet.getIn(['walletInstance', 'privateKey'])
    }),
    (dispatch) => ({
        LectureActions: bindActionCreators(lectureActions, dispatch),
    })
)(Register));