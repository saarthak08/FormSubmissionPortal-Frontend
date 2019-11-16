import React, {Component} from "react";

import styles from "./SignupSuccess.module.css";
import axios from "axios";

class SignupSuccess extends Component {
    state = {
        showAlert: false
    };

    successAlert = () => {
        return this.state.showAlert ? <>
            <div onClick={() => this.setState({showAlert: false})} className={styles.Backdrop}/>
            <div onClick={() => this.setState({showAlert: false})} className={styles.Alert}>
                OTP Sent Successfully!
            </div>
        </> : null;
    };

    resendOTP = () => {
        console.log("resending...");
        const signupData = {
            "email": this.props.location.state.email,
            "firstName": this.props.location.state.firstName,
            "lastName": this.props.location.state.lastName,
            // "facultyNumber": this.state.facultyNumber
        };

        const jsonData = JSON.stringify(signupData);
        console.log(jsonData);

        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/signup/register',
            data: jsonData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    showAlert: true
                });
            }
        }).catch((err) => console.log(err));
    };

    render() {
        console.log(this.props.location.state);
        return (
            <>
                {this.successAlert()}
                <div className={styles.Page}>
                    <div className={styles.Container}>
                        <div className={styles.Heading}>
                            Confirmation Link Sent!
                        </div>
                        <div className={styles.SubHeading}>
                            Open your registered email and visit the link for next steps.
                        </div>
                    </div>
                    <div className={styles.Resend}>
                        <div className={styles.Note}>Didn't get the link?</div>
                        <div onClick={this.resendOTP} className={styles.Button}>
                            Resend OTP
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SignupSuccess;
