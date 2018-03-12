import React, { Component } from 'react';
import './message.css';

export default class Message extends Component {
  render () {
    return (
      <div className={"message-component " + (this.props.isMyMessage === true ? "my-message" : "")}>
        <div className="avatar">
          <img src={require("../assets/avatar_default.jpg")} alt=""/>
        </div>
        <div className="user-message-info">
          <div className="user-name">{this.props.userName}</div>
          <div className="message-content">{this.props.messageContent}</div>
        </div>
      </div>
    )
  }
}