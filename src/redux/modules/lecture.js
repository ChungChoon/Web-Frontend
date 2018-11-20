import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJs } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const REGISTER_LECTURE = 'lecture/REGISTER_LECTURE';
const CHANGE_INPUT = 'lecture/CHANGE_INPUT';
const LOAD_MYLECTURE = 'lecture/LOAD_MYLECTURE';
const LOAD_ALLLECTURE = 'lecture/LOAD_ALLLECTURE;';
const GIVE_PAY = 'lecture/GIVE_PAY'
const LOAD_PARTICIPANTS_INFO = 'lecture/LOAD_PARTICIPANTS_INFO';
const CHECK_ATTENDANCE = 'lecture/CHECK_ATTENDANCE';


// action creator
export const registerLecture = createAction(REGISTER_LECTURE, api.registerLecture);
export const changeInput = createAction(CHANGE_INPUT);
export const loadMyLecture = createAction(LOAD_MYLECTURE, api.getMyLecture);
export const loadAllLecture = createAction(LOAD_ALLLECTURE, api.getAllLecture);
export const givePay = createAction(GIVE_PAY, api.givePay);
export const loadParticipantsInfo = createAction(LOAD_PARTICIPANTS_INFO, api.getParticipantsInfo);
export const checkAttendance = createAction(CHECK_ATTENDANCE, api.checkAttendance);

// initial state
const initialState = Map({
    writeLecture: Map({
        id: null,
        title: '',
        target: null,
        kind: null,
        period: null,
        start_date: '',
        end_date: '',
        place: '',
        curri_title: [""], 
        curri_content: [""], 
        intro: '', 
        price: null, 
        limit_num: null, 
        curri_count: null
    }),
    myLectures: List(),
    allLectures: List(),
    allParticipants: List()
})

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['writeLecture', name], value);
    },
    ...pender({
        type: REGISTER_LECTURE
    }),
    ...pender({
        type: LOAD_MYLECTURE,
        onSuccess: (state, action) => (state.set('myLectures', List(action.payload.data.data)))
    }),
    ...pender({
        type: LOAD_ALLLECTURE,
        onSuccess: (state, action) => (state.set('allLectures', List(action.payload.data.data)))
    }),
    ...pender({
        type: GIVE_PAY,
    }),
    ...pender({
        type: LOAD_PARTICIPANTS_INFO,
        onSuccess: (state, action) => {
            console.log(action.payload.data.data)
            return (state.set('allParticipants', List(action.payload.data.data)))}
    }),
    ...pender({
        type: CHECK_ATTENDANCE,
        onSuccess: (state, action) => (state)
    }),
}, initialState);

