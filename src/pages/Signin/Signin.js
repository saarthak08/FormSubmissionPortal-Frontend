import React, {Component} from "react";

import styles from "./Signin.module.css";
import axios from "axios";

class Signin extends Component {
    state = {
        email: "",
        password: "",
        errorMsg: "",
        redirect: false,
    };

    emailChangeHandler = (e) => {
        let enteredEmail = e.currentTarget.value;
        this.setState({email: enteredEmail});
    };

    passwordChangeHandler = (e) => {
        let enteredPassword = e.currentTarget.value;
        this.setState({password: enteredPassword});
    };

    submitHandler = () => {
        if (this.state.email === "" || this.state.password === "") {
            this.setState({errorMsg: "Bad login credentials"});
            return;
        }

        const jsonData = {
            "username": this.state.email,
            "password": this.state.password
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/authenticate',
            data: jsonData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            /* ***************************************************************
                WARNING:
                This is not the correct way. It's very insecure but who cares,
                it's college project.
            ****************************************************************** */
            const resData = JSON.parse(JSON.stringify(response.data));
            localStorage.setItem("token", resData.token);
            localStorage.setItem("role", resData.role);
            console.log(resData);
            if (response.status === 200) {
                this.props.history.push('/dashboard');
            }
        }).catch(() => {
            this.setState({
                errorMsg: "An error occurred."
            });
        });
    };

    render() {
        return (
            <div className={styles.ConfirmationContainer}>
                <div className={styles.FieldContainer}>
                    <label htmlFor="email">Email</label>
                    <input
                        placeholder="You registered with"
                        id="email"
                        type="text"
                        name="email"
                        onChange={(e) => this.emailChangeHandler(e)}
                    />
                </div>
                <div className={styles.FieldContainer}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        placeholder="************"
                        type="password"
                        name="password"
                        onChange={(e) => this.passwordChangeHandler(e)}
                    />
                    <p className={styles.ErrorMsgContainer}>{this.state.errorMsg}</p>
                </div>
                <button onClick={this.submitHandler} className={styles.SignupButton}>
                    Sign In
                </button>
            </div>
        );
    }
}

export default Signin;
