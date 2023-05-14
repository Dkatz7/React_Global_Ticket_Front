import React, { useEffect } from 'react';
import './App.css';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {
  selectLogged,
  logoutasync,
  selectIsAdmin,
  selectTmploggedUser,
} from './features/Login/loginSlice';
import { useSelector } from 'react-redux';
import { getCartAsync, selectcartitems } from './features/Cart/cartSlice';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { getImagesAsync } from './features/Images/imagesSlice';
import { getEventsAsync } from './features/Events/eventsSlice';
import Home from './features/Home/home';

function App() {
  const dispatch = useAppDispatch();
  const logged = useAppSelector(selectLogged || false);
  const isAdmin = useSelector(selectIsAdmin);
  const cartValue = useSelector(selectcartitems).length;
  const user = useAppSelector(selectTmploggedUser);
  const location = useLocation();

  useEffect(() => {
    dispatch(getImagesAsync());
    dispatch(getEventsAsync());
    dispatch(getCartAsync(user));
  }, [dispatch, user]);

  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <Navbar bg="light" expand="md">
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Nav className="navRight">
            {logged ? (
              <>
                <Nav.Link as={Link} to="/cart">
                  Cart ({cartValue})
                </Nav.Link>
                <Nav.Link onClick={() => dispatch(logoutasync())}>Logout</Nav.Link>
                <Nav.Link as={Link} to="/userinfo">
                  My Profile
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {isAdmin ? (
        <Nav className="justify-content-center" style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
          <Nav.Item>
            <Nav.Link as={Link} to="/Admin-Manage">
              Admin Manage
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Images-Manage">
              Images Manage
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/all_users">
              Users
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/allpurchases">
              Purchases
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ) : null}
      {isHomePage && <Home />}
      <Outlet />
    </div>
  );
}

export default App
