import React from 'react';
import People from '../People/People';
import './ActiveUserList.scss';

export default class ActiveUserList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          LoginUsername: '',
        }
      }

      //Jag läser in inloggad användare lokalt och visar nedan i this.user.username, tanken är att den ska läsa in från db inloggade användare!!!!
//läs in vem som är inloggad och användes i aktiva användare i render() med this.user.username
user = JSON.parse(window.localStorage.loggedInUser);

    render() {
        return (
            <div className="display-activeusers">
                <People className="float-left avatar-head-in-chat mr-3" head={true} scale="1" />
                <span className="centerthing">{this.user.username}</span>

            </div>
        );
    }
}

