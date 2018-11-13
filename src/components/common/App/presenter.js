import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles.scss";
import Navigation from "components/Navigation";
import Footer from "components/Footer";
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import Login from "components/Login";
import Signup from "components/Signup";
import SignupForm from "components/SignupForm";
import About from "components/About";
import Register from "components/Register";
import MyPage from "components/MyPage";
import Check from "components/Check";


const App = props => [
    <Navigation key={1} />,
    <Routes key={2} />,
    <Footer key={3} />
]

const Routes = props => (
    <Switch>
            <Route path="/about" component={About} />
            <Route path="/register" component={Register} />
            <Route path="/mypage" component={MyPage}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route path="/signup/:type" component={SignupForm}/>
            <Route path="/check" component={Check}/>
    </Switch>
)

export default App;