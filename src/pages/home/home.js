import React, { Component } from 'react';
import './home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  handleInputChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.name) {
      this.props.history.push({
        pathname: '/chat',
        state: { name: this.state.name }
      });
    }
  }

  render() {
    return (
      <div className="home-component">
        <div className="home-form">
          <div className="home-title">请输入您的昵称：</div>
          <div className="home-input">
            <input type="text" className="home-user-name" 
              value={this.state.name} 
              onChange={this.handleInputChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}