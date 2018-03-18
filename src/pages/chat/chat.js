import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './chat.css';
import Message from '../../components/message';
const socket = require('socket.io-client')('http://localhost:3333');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      canSendMessage: false,
      messageList: []
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.location.state.name
    });
    socket.emit('joinChat', this.props.location.state.name);
    this.setState({
      messageList: [
        {
          isRemind: true,
          isMyMessage: false,
          userName: '',
          messageContent: `你已加入群聊`
        }
      ]
    });
    socket.on('acceptMessage', data => {
      let messageList = this.state.messageList;
      messageList = this.dealBeforeNewMessage(messageList, data);
      messageList.push(
        {
          isRemind: false,
          isMyMessage: false,
          userName: data.userName,
          messageContent: data.message,
          createTime: data.createTime
        }
      );
      this.setState({
        messageList: messageList
      });
    });
    socket.on('joinChatRemind', data => {
      let messageList = this.state.messageList;
      messageList = this.dealBeforeNewMessage(messageList, data);
      messageList.push(
        {
          isRemind: true,
          isMyMessage: false,
          userName: '',
          messageContent: `${data.userName} 加入群聊`,
          createTime: data.createTime
        }
      );
      this.setState({
        messageList: messageList
      });
    })
  }

  handleInputChange(e) {
    this.setState({
      message: e.target.value
    });
    if (e.target.value !== '') {
      this.setState({
        canSendMessage: true
      });
    } else {
      this.setState({
        canSendMessage: false
      });
    }
  }

  handleSendMessage(e) {
    if (!this.state.canSendMessage) {
      return
    } else {
      let messageList = this.state.messageList
      let createTime = Date.now();
      messageList = this.dealBeforeNewMessage(messageList, {
        createTime: createTime
      });
      messageList.push(
        {
          isMyMessage: true,
          userName: this.state.name,
          messageContent: this.state.message,
          createTime: createTime
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

  dealBeforeNewMessage(messageList, data) {
    if (messageList.length > 0) {
      let lastMessage = messageList[messageList.length - 1];
      if (moment(data.createTime).diff(lastMessage.createTime) / 1000 / 60 >= 2) {
        messageList.push(
          {
            isRemind: true,
            isMyMessage: false,
            userName: '',
            messageContent: moment(data.createTime).format('HH:mm'),
            createTime: data.createTime
          }
        );
      }
    }
    return messageList;
  }

  render() {
    return (
      <div className="chat">
        <header className="chat-header">
          <Link to="/" className="back">&lt;</Link>
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
