import React from 'react';
import styles from './styles.scss';

const AboutImage = () => (
    <div className={styles.about}>
        <div className={styles.container}>
            <img src={require("images/img_intro@3x.png")} alt="소개이미지"/>
        </div>
    </div>
)

export default AboutImage;