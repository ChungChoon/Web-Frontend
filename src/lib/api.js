import axios from 'axios';

const BASE_URL = 'http://52.79.137.94:3000';

export const signupFarmer = ({mail, passwd, name, sex, hp, birth, career, farm_num, farm_addr, farm_name, private_key, wallet}) => axios.post(`${BASE_URL}/user/signup/farmer`, {mail, passwd, name, sex, hp, birth, career, farm_num, farm_addr, farm_name, private_key, wallet});
export const signupStudent = ({mail, passwd, name, sex, hp, birth, key, wallet}) =>  axios.post(`${BASE_URL}/user/signup`, {mail, passwd, name, sex, hp, birth, key, wallet});
export const checkEmailDuplication = (mail) => axios.post(`${BASE_URL}/user/dupcheck/mail`, {mail});
export const login = ({mail, passwd}) => axios.post(`${BASE_URL}/user/signin/farmer`, {mail, passwd});

export const registerLecture = ({token, lecture_bn, title, target, kind, period, start_date, end_date, place, curri_title, curri_content, intro, price, limit_num, curri_count}) => 
    {   console.log(token, lecture_bn, title, target, kind, period) 
        console.log(start_date, end_date, place)
        console.log(curri_title, curri_content) 
        console.log(intro, price, limit_num, curri_count)
        return axios.post(`${BASE_URL}/lecture/create`, 
    {lecture_bn, title, target, kind, period, start_date, end_date, place, curri_title, curri_content, intro, price, limit_num, curri_count}, 
    {headers: {token}});
}
export const getMyLecture = (token) => axios.get(`${BASE_URL}/farmer`, { headers: { token }});

export const getLectureDetail = (token, lid) => axios.get(`${BASE_URL}/lecture/${lid}`, { headers: { token }});

export const getParticipantsInfo = (token, lid) => axios.get(`${BASE_URL}/farmer/info/${lid}`, { headers: { token }});
export const checkAttendance = ({token, lecture_id, attendants}) => axios.post(`${BASE_URL}/lecture/attend`, {lecture_id, attendants} , { headers: { token }});

// 어드민용
export const getAllLecture = (token) => axios.get(`${BASE_URL}/admin`, { headers: { token }});
export const givePay = (token, lecture_id) => axios.post(`${BASE_URL}/admin`, {lecture_id}, { headers: { token }});