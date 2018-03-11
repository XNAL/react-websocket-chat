import React, { Component } from 'react';
import './chat.css';
import Message from '../../components/message';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      canSendMessage: false
    };
  }

  handleInputChange(e) {
    this.setState({
      message: e.target.value
    })
    if (e.target.value !== '') {
      this.setState({
        canSendMessage: true
      })
    } else {
      this.setState({
        canSendMessage: false
      })
    }
  }

  handleSendMessage(e) {
    if (!this.state.canSendMessage) {
      return
    } else {
      alert(this.state.message)
    }
  }

  render() {
    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">React Chat</h1>
        </header>
        <div className="message-list">
          <Message/>
        </div>
        <footer className="chat-footer">
          <textarea className="chat-input" rows="1" value={this.state.message} onChange={this.handleInputChange.bind(this)}/>
          <span className={"send-message " + (this.state.canSendMessage ? "can-send" : "")} onClick={this.handleSendMessage.bind(this)}>发送</span>
        </footer>
      </div>
    );
  }
}

export default Chat;
