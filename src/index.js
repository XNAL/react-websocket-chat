import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import Chat from './pages/chat/chat';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chat />, document.getElementById('root'));
registerServiceWorker();
