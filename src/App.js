import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import './App.css';
import Signup from "./pages/Signup/Signup";
import SignupSuccess from "./pages/SignupSuccess/SignupSuccess";
import SigninSuccess from "./pages/SigninSuccess/SigninSuccess";
import Confirmation from "./pages/Confirmation/Confirmation";
import Signin from "./pages/Signin/Signin";
import Dashboard from "./pages/Dashboard/Dashboard";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Signup}/>
                    <Route exact path="/signin" component={Signin}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/signup-successful" component={SignupSuccess}/>
                    <Route exact path="/signin-successful" component={SigninSuccess}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/confirm/:token" component={Confirmation}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
