import React, { Component } from 'react';
import './chat.css';
import Message from '../../components/message';
const socket = require('socket.io-client')('http://localhost:3333');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      canSendMessage: false,
      messageList: [
        {
          isMyMessage: false,
          userName: "小a",
          messageContent: "测试接受"
        },
        {
          isMyMessage: false,
          userName: "小b",
          messageContent: "二"
        },
        {
          isMyMessage: true,
          userName: "小C",
          messageContent: "测试发送"
        }
      ]
    };
  }

  componentDidMount() {
    socket.emit('joinChat', 'test')
    socket.on('acceptMessage', data => {
      console.log('acceptMessage', data)
    })
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
      let messageList = this.state.messageList
      messageList.push(
        {
          isMyMessage: true,
          userName: "小C",
          messageContent: this.state.message
        }
      )
      socket.emit('sendMessage', this.state.message)
      this.setState({
        message: '',
        canSendMessage: false,
        messageList: messageList
      })
    }
  }

  render() {
    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">React Chat</h1>
        </header>
        <div className="message-list">
          {
            this.state.messageList.map((message, index) => {
              return <Message {...message} key={index} />
            })
          }
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
