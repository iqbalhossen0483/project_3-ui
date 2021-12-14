import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AlartProvider from './Component/Hook/AlartProvider';
import { Offline, Online } from "react-detect-offline";
import InternetDetector from './Component/InternetDetector/InternetDetector';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlartProvider>
        <Online>
          <App />
        </Online>
        <Offline>
          <InternetDetector />
        </Offline>
      </AlartProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
