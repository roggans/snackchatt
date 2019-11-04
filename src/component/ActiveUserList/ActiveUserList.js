import React from 'react';
import People from '../People/People';
//import JoinRoom from '../JoinRoom/JoinRoom';
import './ActiveUserList.scss';
import axios from 'axios';

export default class ActiveUserList extends React.Component {
    constructor(props) {
        super(props);
        // Call getActiveUsers every 10:th second
        this.getActiveUsers();
        this.state = { activeUsers: [] };
        setInterval(() => this.getActiveUsers(), 1000);
    }

    async getActiveUsers() {
        let activeUsers = (await axios.get('/api/active-users')).data;
        this.setState({ activeUsers: activeUsers });
    }

    //user = JSON.parse(window.localStorage.loggedInUser);

    render() {
        return (
            <div className="all-active">
                {this.state.activeUsers.map(user =>
                    <div className="display-activeusers">
                        <People className="float-left avatar-head-in-chat mr-3" head={true} scale="1" avatar={user.avatar} />
                        <span className="centerthing">{user.username}</span>


                    </div>
                )}
            </div>
        );
    }
}

