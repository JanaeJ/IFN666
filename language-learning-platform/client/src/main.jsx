import "./styles/accessibility.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom'; 
import { MantineProvider } from '@mantine/core';

// 加的新的，来自于老师例子
import '@mantine/core/styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/language-learning">
      <AuthProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light', // 支持 light 或 dark 模式
            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
            headings: {
              fontWeight: 600,
            },
            defaultRadius: 'md',
            primaryColor: 'blue', // 你可以改成你喜欢的主色，如 teal, cyan, orange 等
          }}
        >
          <App />
        </MantineProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
