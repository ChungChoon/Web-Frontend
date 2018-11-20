//imports
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// actions types
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const CHECK_EMAIL_DUPLICATION = "user/CHECK_EMAIL_DUPLICATION";
const SIGNUP_FARMER = "user/SIGNUP_FARMER";
const SIGNUP_STUDENT = "user/SIGNUP_STUDENT";
const SET_ERROR = "user/SET_ERROR";
const SET_LOGGED_INFO = "user/SET_LOGGED_INFO";

// actions creators
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT);
export const checkEmailDuplication = createAction(CHECK_EMAIL_DUPLICATION, api.checkEmailDuplication);
export const signupFarmer = createAction(SIGNUP_FARMER, api.signupFarmer);
export const signupStudent = createAction(SIGNUP_STUDENT, api.signupStudent);
export const setError = createAction(SET_ERROR);
export const setLoggedInfo = createAction(SET_LOGGED_INFO); 


// initial state 
const initialState = Map({
    isLoggedIn: sessionStorage.getItem("token") ? true : false,
    token : sessionStorage.getItem("token"),
    loginInfo: Map({
        mail: '',
        name: '',
        wallet: '',
        birth: '',
        sex: '',
        hp: '',
        flag: null,
        private_key: ''
    }),
    signup: Map({
        error: null,
        duplication: null
    }),
    login: Map({
        error: null
    }),
    result: Map({})
});

// reducer
export default handleActions({
    ...pender({
        type: LOGIN,
        onSuccess: (state, action) => 
            state.set('result', Map(action.payload.data)),
    }),
    ...pender({
        type: CHECK_EMAIL_DUPLICATION,
        onSuccess: (state, action) => state.setIn(['signup', 'duplication'], action.payload.data.message)
    }),
    ...pender({
        type: SIGNUP_FARMER,
        onFailure: (state, action) => state
    }),
    ...pender({
        type: SIGNUP_STUDENT,
        onFailure: (state, action) => state
    }),
    [SET_ERROR]: (state, action) => {
        const { location , message } = action.payload;
        return state.setIn([ location, 'error'], message);
    },
    [SET_LOGGED_INFO]: (state, action) => {
        // console.log(action.payload.data[0])
        return state.setIn(['loginInfo', 'mail'], action.payload.data[0].mail)
        .setIn(['loginInfo', 'name'], action.payload.data[0].name)
        .setIn(['loginInfo', 'wallet'], action.payload.data[0].wallet)
        .setIn(['loginInfo', 'birth'], action.payload.data[0].birth)
        .setIn(['loginInfo', 'sex'], action.payload.data[0].sex)
        .setIn(['loginInfo', 'hp'], action.payload.data[0].hp)
        .setIn(['loginInfo', 'flag'], action.payload.data[0].flag)
        .setIn(['loginInfo', 'private_key'], action.payload.data[0].private_key)
        .set('isLoggedIn', sessionStorage.getItem("token") ? true : false)
        .set('token', sessionStorage.getItem("token"))
    }

}, initialState)
