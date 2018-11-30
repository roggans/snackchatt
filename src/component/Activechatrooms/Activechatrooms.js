import React from 'react';
import './Activechatrooms.scss';

export default class Activechatrooms extends React.Component {
      render() {
        return (
            <div className="display-activerooms" onClick={() => { this.props.onClick(this.props.roomname); }}>
                {this.props.roomname}

            </div>
        );
    }
}