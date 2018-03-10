import React, { Component } from 'react';
import './chat.css';

class Chat extends Component {
  render() {
    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">React Chat</h1>
        </header>
        <footer className="chat-footer">
          <textarea className="chat-input" rows="1"/>
          <span className="send-message">发送</span>
        </footer>
      </div>
    );
  }
}

export default Chat;
