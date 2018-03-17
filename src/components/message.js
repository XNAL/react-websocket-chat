import React, { Component } from 'react';
import './message.css';

export default class Message extends Component {
  render () {
    let message = ''
    if (this.props.isRemind) {
      message = <div className="message-component remind">
        <div className="remind-message">
          {this.props.messageContent}
        </div>
      </div>
    } else {
      message = 
        <div className={"message-component " + (this.props.isMyMessage === true ? "my-message" : "")}>
          <div className="avatar">
            <img src={require("../assets/avatar_default.jpg")} alt=""/>
          </div>
          <div className="user-message-info">
            <div className="user-name">{this.props.userName}</div>
            <div className="message-content">{this.props.messageContent}</div>
          </div>
        </div>
    }
    return (
      message
    )
  }
}