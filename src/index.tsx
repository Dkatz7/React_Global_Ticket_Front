import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Login } from './features/Login/login';
import { Register } from './features/Register/register';
import { Events, ShowEvent } from './features/Events/events';
import { ShowEvents } from './features/Events/events';
import { Cart } from './features/Cart/cart';
import { Userinfo } from './features/Userinfo/userinfo';
import { ImagesComponent } from './features/Images/images';
import { AboutUs } from './features/About/about';
import { AllUsers } from './features/AllUsers/allusers';
import { AllPurchassess } from './features/AllPurchasses/allpurchasses';
import Home from './features/Home/home';
import {ContactPage} from "./features/Contact/contact"

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login/" element={<Login />} />
            <Route path="userinfo/" element={<Userinfo />} />
            <Route path="cart/" element={<Cart />} />
            <Route path="register/" element={<Register />} />
            <Route path="About/" element={<AboutUs />} />
            <Route path="Events/" element={<ShowEvents />} />
            <Route path="Events/:evId" element={<ShowEvent />} />
            <Route path="Admin-Manage/" element={<Events />} />
            <Route path="Images-Manage/" element={<ImagesComponent />} />
            <Route path="all_users/" element={<AllUsers />} />
            <Route path="allpurchases/" element={<AllPurchassess />} />
            <Route path="contact/" element={<ContactPage></ContactPage>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

function NotFound() {
  const navigate = useNavigate();

  const handleReturnHomeClick = () => {
    navigate('/');
  };

  return (
    <main style={{ padding: '1rem' }}>
      <p>This page does not exist yet</p>
      <button onClick={handleReturnHomeClick}>Return Home</button>
    </main>
  );
}

reportWebVitals();