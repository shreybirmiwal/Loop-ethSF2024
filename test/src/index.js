import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



import { ThirdwebProvider, ConnectButton } from "thirdweb/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <ThirdwebProvider
      clientId="054f29c5673f6dd2f9955c0e3a447113"
      defaultChainId={48899}
    >
      <App />
    </ThirdwebProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
