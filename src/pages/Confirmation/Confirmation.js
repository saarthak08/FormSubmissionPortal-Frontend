import React, {Component} from "react";

import styles from "./Confirmation.module.css";
import axios from "axios";

class Confirmation extends Component {
    state = {
        password1: "",
        password2: "",
        passwordErrorMsg: "",
    };

    password1ChangeHandler = (e) => {
        let enteredPassword = e.currentTarget.value;
        this.setState({password1: enteredPassword});
    };

    password2ChangeHandler = (e) => {
        let enteredPassword = e.currentTarget.value;
        this.setState({password2: enteredPassword});
    };

    submitHandler = () => {
        if (this.state.password1 !== this.state.password2) {
            this.setState({passwordErrorMsg: "Passwords don't match"});
            return;
        }

        const jsonData = {
            "password": this.state.password1,
            "token": this.props.match.params.token
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/signup/confirm',
            data: jsonData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.status === 200) {
                this.props.history.push('/signin');
            }
        }).catch(error => {
            this.setState({loading: false});
            if (error.response === undefined) {
                // This is the case when the user is not connected to internet
                // More accurately the user is not connected to server.
                this.setState({password2ErrorMsg: "Error occurred. Are you connected to internet?"});
                return;
            }
            // If error is associated with email.
            if (error.response.data["email"] !== undefined) {
                this.setState({emailErrorMsg: error.response.data["email"]});
                return;
            }
            // If error is associated with password.
            if (error.response.data["password"] !== undefined) {
                this.setState({password1ErrorMsg: error.response.data["password"]});
                return;
            }
            // If error is associated to fist name.
            if (error.response.data["firstName"] !== undefined) {
                this.setState({firstNameErrorMsg: error.response.data["firstName"]});
                return;
            }

            // This is general error message which is shown when no error message is sent by
            // the server.
            this.setState({
                password2ErrorMsg: "An error occurred. Send us report via feedback chat."
            });
        });
    };

    render() {
        console.log(this.props.match.params.token);
        return (
            <div className={styles.ConfirmationContainer}>
                <div className={styles.FieldContainer}>
                    <label htmlFor="password">Password</label>
                    <input
                        placeholder="At least 8 digits long"
                        id="password"
                        type="password"
                        name="password"
                        onChange={(e) => this.password1ChangeHandler(e)}
                    />
                    {/*<p className={styles.ErrorMsgContainer}>{this.state.password1ErrorMsg}</p>*/}
                </div>
                <div className={styles.FieldContainer}>
                    <label htmlFor="password">Confirm Password</label>
                    <input
                        placeholder="Same as above"
                        id="password"
                        type="password"
                        name="password"
                        onChange={(e) => this.password2ChangeHandler(e)}
                    />
                    <p className={styles.ErrorMsgContainer}>{this.state.passwordErrorMsg}</p>
                </div>
                <button onClick={this.submitHandler} className={styles.SignupButton}>
                    Submit
                </button>
            </div>
        );
    }
}

export default Confirmation;
