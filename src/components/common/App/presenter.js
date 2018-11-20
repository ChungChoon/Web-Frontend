import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles.scss";

import { AboutPage, MyPage, LoginPage, SignupPage, NotFoundPage, RegisterPage, AdminPage, AttendancePage, LectureDetailPage } from 'pages';
import Navigation from "components/common/Navigation";
import Footer from "components/common/Footer";
import SignupWrapper from "components/signup/SignupWrapper";


const App = props => [
    <Navigation key={1} />,
    <Routes key={2} />,
    <Footer key={3} />
]

const Routes = props => (
    <Switch>
        <Route exact path="/" component={AboutPage} />
        <Route path="/about" component={AboutPage}/>
        <Route path="/register" component={RegisterPage} />
        <Route path="/mypage" component={MyPage}/>
        <Route exact path="/lecture/:id/attendance" component={AttendancePage}/>
        <Route path="/lecture/:id" component={LectureDetailPage} />
        <Route path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route path="/signup/:type" component={SignupWrapper}/>
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFoundPage}/>
    </Switch>
)

export default App;