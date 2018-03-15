import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/app.css';
import './index.css';
import Chat from './pages/chat/chat';
import Home from './pages/home/home'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router>
    <div className="router-wrap">
      <Route exact path="/" component={Home}/>
      <Route path="/chat" component={Chat}/>
    </div>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
