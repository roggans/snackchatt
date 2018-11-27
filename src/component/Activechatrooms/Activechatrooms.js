import React from 'react';
import './Activechatrooms.scss';

export default class Activechatrooms extends React.Component {
    constructor(props){
        super(props);
        this.state = {
         currentroom: '',
        }
      }
      render() {
        return (
            <div className="display-activerooms">
                {this.props.roomname}

            </div>
        );
    }
    }