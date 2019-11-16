import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

class LoginRequired extends Component {
    state = {
        isLoggedIn: null
    };

    componentDidMount() {
        axios({
            method: "POST",
            url: "http://localhost:8080/api/is-logged-in",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
        })
            .then(() => this.setState({isLoggedIn: true}))
            .catch(() => this.setState({isLoggedIn: false}));
    }

    render() {
        if (this.state.isLoggedIn === null) {
            return <div>Loading...</div>;
        }
        if (this.state.isLoggedIn) {
            return this.props.children;
        } else {
            return <Redirect to="/signin"/>;
        }
    }
}

export default LoginRequired;
