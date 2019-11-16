import React, {Component} from "react";
import axios from "axios";

import styles from "./UserCard.module.css";

class UserCard extends Component {
    state = {
        isLoaded: false,
        firstName: "",
        lastName: "",
        email: "",
    };

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/user/info',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
            },
        }).then(response => {
            const resData = JSON.parse(JSON.stringify(response.data));
            localStorage.setItem("token", resData.token);
            if (response.status === 200) {
                this.setState({
                    isLoaded: true,
                    firstName: resData.firstName,
                    lastName: resData.lastName,
                    email: resData.email,
                });
            }
        }).catch(() => {
            this.setState({
                errorMsg: "An error occurred."
            });
        });
    };

    render() {
        return (
            <div className={styles.Container}>
                <div className={styles.Role}>{localStorage.getItem("role")}</div>
                <div className={styles.Data}>
                    <div className={styles.Pic}/>
                    {
                        this.state.isLoaded ?
                            <>
                                <div className={styles.Name}>{this.state.firstName + " " + this.state.lastName}</div>
                                <div className={styles.Email}>{this.state.email}</div>
                            </> : "Loading..."
                    }
                </div>
                <div className={styles.Controls}>

                </div>
            </div>
        );
    }
}

export default UserCard;
