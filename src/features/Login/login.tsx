import React, { useEffect, useState, cloneElement } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginSlice, LoginState, loginAsync, logoutasync, selectLogged, selectTmploggedUser, selectloginstatus } from './loginSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Form, Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCartAsync } from '../Cart/cartSlice';

export const Login = () => {
  const [user, setuser] = useState("");
  const [pwd, setpwd] = useState("");
  const logged = useAppSelector(selectLogged);
  const dispatch = useAppDispatch();
  const userlogged = useAppSelector(selectTmploggedUser);
  const loginstatus = useAppSelector(selectloginstatus)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(loginAsync({ user, pwd }));
    }
  };
  const rendercart =(user: string)=>{getCartAsync(user)}

  const toastSuccess = (user: string) => toast.success(`Loggin Seccessfully as ${user}!`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
  const toasterror = () => toast.error('Login Faild!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });

  useEffect(() => {
    if (loginstatus === 'success') {
      toastSuccess(userlogged);
    } else if (loginstatus === 'failed') {
      toasterror();
    }
  }, [loginstatus, userlogged]);

  return (
    <div className="container">
      <ToastContainer position="top-right"
        autoClose={5000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
      {loginstatus === "idle" ? (
        <div className="text-center">
          {logged ? `Welcome ${userlogged}` : `Please login`}
          <h1>Login</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User:</Form.Label>
              <Form.Control type="email" placeholder="Enter username" onChange={(e) => setuser(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setpwd(e.target.value)} onKeyDown={handleKeyDown} />
            </Form.Group>
            <Button id='login-b' variant="primary" type="button" onClick={() => dispatch(loginAsync({ user, pwd }))}>
              Login
            </Button>
          </Form>
        </div>) :
        <div>
          {loginstatus === "failed" ? (<div className="text-center">
            {logged ? `Welcome ${userlogged}` : `Please login`}
            <h1>Login</h1>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setuser(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setpwd(e.target.value)} onKeyDown={handleKeyDown} />
              </Form.Group>
              <Button id='login-b' variant="primary" type="button" onClick={() => dispatch(loginAsync({ user, pwd }))}>
                Login
              </Button>
            </Form>
            <h2 className="text-danger">Username or password is incorrect.</h2>
          </div>) :
            <div>
              {loginstatus === "success" ?
                <div className="text-center" >
                  <h1>You are logged in as {userlogged}.</h1>
                </div> : ""}
            </div>}
        </div>}
    </div>
  );
}
