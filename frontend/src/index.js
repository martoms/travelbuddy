// External CSS
import 'bootstrap/dist/css/bootstrap.css';
// Internal Modular CSS
import './styles/index.css';
import './styles/index-responsive.css';
import './styles/destinations.css';
import './styles/destinations-responsive.css';
import './styles/bookings.css';
import './styles/bookings-responsive.css';
import './styles/signup-login.css';
import './styles/signup-login-responsive.css';
import './styles/user-admin-profile.css';
import './styles/user-admin-profile-responsive.css';
import './styles/404.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AllContextProvider } from './context/AllContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AllContextProvider>
        <App />
      </AllContextProvider>
  </React.StrictMode>
);


