import React, { Component } from 'react';
import './message.css';

export default class Message extends Component {
  render () {
    return (
      <div className="message-component">
        <div className="avatar">
          <img src={require('../assets/avatar_default.jpg')} alt=""/>
        </div>
        <div className="message-content">12312131123123</div>
      </div>
    )
  }
}