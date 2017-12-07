import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // <--- add this
import store from './store'; // <--- add this BEFORE App
import 'kea-thunk/install'
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('root')
);