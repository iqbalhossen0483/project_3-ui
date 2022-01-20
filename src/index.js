import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AlartProvider from './Component/Hook/AlartProvider';

ReactDOM.render(
    <BrowserRouter>
      <AlartProvider>
        <App />
      </AlartProvider>
    </BrowserRouter>,
  document.getElementById('root')
);