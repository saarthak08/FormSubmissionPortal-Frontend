import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import styles from './Signup.module.css';

class Signup extends Component {
    state = {
        email: "",
        emailErrorMsg: "",
        firstName: "",
        firstNameErrorMsg: "",
        lastName: "",
        lastNameErrorMsg: "",
        facultyNumber: "",
        facultyNumberErrorMsg: "",
        role: "student",
        loading: false,
        redirect: false
    };

    radioHandler = (e) => {
        this.setState({
            role: e.currentTarget.value
        });
    };

    emailChangeHandler = (e) => {
        let enteredEmail = e.currentTarget.value;
        this.setState({email: enteredEmail});
    };

    validateEmail = (email) => {
        if (email === "") {
            this.setState({emailErrorMsg: "Email address can't be empty."});
            return false;
        }
        if (email.length > 255) {
            this.setState({emailErrorMsg: "Email address is too long."});
            return false;
        }

        // You can use more complex regular expressions to check the
        // emails but really the best way is to allow weak check here
        // and then do email verification by sending an email to the
        // user.
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            this.setState({emailErrorMsg: "Email address is not valid."});
            return false;
        }
        this.setState({emailErrorMsg: ""});
        // We reach this point when email passes all the frontend checks.
        return true;
    };

    activateSignUpButton = (e) => {
        if (e.keyCode === 13) {
            this.submitFormHandler();
        }
    };

    firstNameChangeHandler = (e) => {
        let enteredFirstName = e.currentTarget.value;
        this.setState({firstName: enteredFirstName});
    };

    validateFirstName = (firstName) => {
        if (firstName === "") {
            this.setState({firstNameErrorMsg: "First name can't be empty."});
            return false;
        }
        if (firstName.length > 255) {
            this.setState({firstNameErrorMsg: "First name is too long."});
            return false;
        }
        // Remove the previous error messages (if any) when first name is valid.
        this.setState({firstNameErrorMsg: ""});
        return true;
    };

    lastNameChangeHandler = (e) => {
        let enteredLastName = e.currentTarget.value;
        this.setState({lastName: enteredLastName});
    };

    validateLastName = (lastName) => {
        if (lastName === "") {
            this.setState({lastNameErrorMsg: "Last name can't be empty."});
            return false;
        }
        if (lastName.length > 255) {
            this.setState({lastNameErrorMsg: "Last name is too long."});
            return false;
        }
        // Remove the previous error messages (if any) when first name is valid.2
        this.setState({lastNameErrorMsg: ""});
        return true;
    };

    facultyNumberChangeHandler = (e) => {
        let enteredFacultyNumber = e.currentTarget.value;
        this.setState({facultyNumber: enteredFacultyNumber});
    };

    validateFacultyNumber = (facultyNumber) => {
        if (facultyNumber === "") {
            this.setState({facultyNumberErrorMsg: "Faculty Number can't be empty."});
            return false;
        }
        if (facultyNumber.length > 8) {
            this.setState({facultyNumberErrorMsg: "Faculty Number is too long."});
            return false;
        }
        // Remove the previous error messages (if any) when first name is valid.
        this.setState({facultyNumberErrorMsg: ""});
        return true;
    };


    submitFormHandler = () => {
        this.setState({loading: true});
        let isEmailValid = this.validateEmail(this.state.email);
        let isFirstNameValid = this.validateFirstName(this.state.firstName);
        let isLastNameValid = this.validateLastName(this.state.lastName);
        let isFacultyNumberValid = this.validateFacultyNumber(this.state.facultyNumber);
        if (!(isEmailValid && isFirstNameValid && isLastNameValid && isFacultyNumberValid)) {
            // Data is invalid so don't do anything and return out of function.
            this.setState({loading: false});
            return;
        }
        // Data is valid so we can send it to server.
        const signupData = {
            "email": this.state.email,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "role": this.state.role.toUpperCase(),
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
        }).then(response => {
            if (response.status === 200) {
                // If user signed up successfully then at this point we
                // want to redirect user to the email verification page.
                // this.props.history.push({pathname: "/signup-successful"});
                this.setState({redirect: true});
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
        return (
            <>
                {this.state.redirect ? this.props.history.push('/signup-successful', {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    facultyName: this.state.facultyNumber
                }) : null}
                <div className={styles.SignupContainer} onKeyDown={(e) => this.activateSignUpButton(e)}>
                    <div className={styles.InfoSection}>
                        <h1>Z H C E T</h1>
                        <h1>From Submission Portal</h1>
                    </div>
                    <div className={styles.Separator}/>
                    <div className={styles.FieldsContainer}>
                        <div className={styles.FieldContainer}>
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="you@example.com"
                                id="email"
                                type="text"
                                name="email"
                                onChange={(e) => this.emailChangeHandler(e)}
                            />
                            <p className={styles.ErrorMsgContainer}>{this.state.emailErrorMsg}</p>
                        </div>
                        <div className={styles.FieldContainer}>
                            <label htmlFor="first_name">First Name</label>
                            <input
                                placeholder="Your first name?"
                                id="first_name"
                                type="text"
                                name="first_name"
                                onChange={(e) => this.firstNameChangeHandler(e)}
                            />
                            <p className={styles.ErrorMsgContainer}>{this.state.firstNameErrorMsg}</p>
                        </div>
                        <div className={styles.FieldContainer}>
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                placeholder="Your last name?"
                                id="last_name"
                                type="text"
                                name="last_name"
                                onChange={(e) => this.lastNameChangeHandler(e)}
                            />
                            <p className={styles.ErrorMsgContainer}>{this.state.lastNameErrorMsg}</p>
                        </div>
                        <div className={styles.FieldContainer}>
                            <label htmlFor="faculty_number">Faculty Number</label>
                            <input
                                placeholder="Your faculty number?"
                                id="faculty_NUMBER"
                                type="text"
                                name="faculty_name"
                                onChange={(e) => this.facultyNumberChangeHandler(e)}
                            />
                            <p className={styles.ErrorMsgContainer}>{this.state.facultyNumberErrorMsg}</p>
                        </div>
                        <div className={styles.RadiosContainer}>
                            <div className={styles.RadioField}>
                                <input
                                    onChange={(e) => this.radioHandler(e)}
                                    id="role1"
                                    type="radio"
                                    name="role"
                                    value="dean"
                                    checked={this.state.role === "dean"}
                                />
                                <label htmlFor="role1">Dean</label>
                            </div>
                            <div className={styles.RadioField}>
                                <input
                                    onChange={(e) => this.radioHandler(e)}
                                    id="role2"
                                    type="radio"
                                    name="role"
                                    value="controller"
                                    checked={this.state.role === "controller"}
                                />
                                <label htmlFor="role2">Controller</label>
                            </div>
                            <div className={styles.RadioField}>
                                <input
                                    onChange={(e) => this.radioHandler(e)}
                                    id="role3"
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={this.state.role === "student"}
                                />
                                <label htmlFor="role3">Student</label>
                            </div>
                        </div>
                        {
                            !this.state.loading ?
                                <button onClick={this.submitFormHandler} className={styles.SignupButton}>
                                    Sign Up
                                </button>
                                : <p>Signing up...</p>
                        }
                    </div>
                </div>
                <div className={styles.BottomContainer}>
                    <p>Have an account?</p>&nbsp;
                    <Link
                        className={styles.Link}
                        to="/signin">
                        Sign In
                    </Link>
                </div>
            </>
        );
    }
}

export default Signup;
