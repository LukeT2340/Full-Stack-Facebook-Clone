import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './AuthContext';
import { ChatContextProvider } from './ChatContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <ChatContextProvider >
        <App />
      </ChatContextProvider>
    </AuthContextProvider>
);
