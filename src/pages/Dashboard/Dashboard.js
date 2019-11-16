import React, {Component} from "react";


import LoginRequired from "../../wrappers/LoginRequired";
import UserCard from "../../component/UserCard/UserCard";

import styles from "./Dashboard.module.css";

class Dashboard extends Component {
    render() {
        return (
            <LoginRequired>
                <div className={styles.Page}>
                    <UserCard/>
                </div>
            </LoginRequired>
        );
    }
}

export default Dashboard;
