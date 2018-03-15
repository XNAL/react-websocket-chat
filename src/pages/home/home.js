import React, { Component } from 'react';
import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="home-component">
        <div className="home-form">
          <div className="home-title">请输入您的昵称：</div>
          <div className="home-input">
            <input type="text" className="home-user-name"/>
          </div>
        </div>
      </div>
    )
  }
}