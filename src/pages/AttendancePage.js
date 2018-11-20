import React from 'react';
import AttendanceForm from 'components/lecture/AttendanceForm';
import LectureHeader from 'components/lecture/LectureHeader';


const AttendancePage = (props) => (
    <div>
    <LectureHeader {...props}/>
    <AttendanceForm {...props}/>
    </div>
)

export default AttendancePage;