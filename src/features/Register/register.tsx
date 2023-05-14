import React, { useEffect, useState } from 'react';
import { LoginSlice, selectLogged, registerAsync, selectRegistercompleted, selectRegisterstatus } from './registerSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export const Register = () => {
  const [user, setuser] = useState("")
  const [pwd, setpwd] = useState("")
  const [pwd2, setpwd2] = useState("")
  const [email, setemail] = useState("")
  const logged = useAppSelector(selectLogged);
  const registredcompleate = useAppSelector(selectRegistercompleted)
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectRegisterstatus)


  return (
    <div>
      {registredcompleate ? <h1>The register as been completed! you can now make login </h1> :
        <div>
          <br></br>
          {logged ? `Welcome, you are already logged in` : `Please enter your username and password`}
          <h1>Register</h1>
          User:
          <input className='form-control' type={"text"} placeholder="username" onChange={(e) => setuser(e.target.value)} />

          Email:
          <input className="form-control" type="email" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
          Password:
          <input className="form-control" type="password" placeholder="Password" onChange={(e) => setpwd(e.target.value)} />
          Please insert your password again:
          <input className="form-control" type="password" placeholder="Confirm Password" onChange={(e) => setpwd2(e.target.value)} />
          {pwd2 == pwd ? `` : <p className='text-danger'>Please check your password, it's not the same</p>}
          <br></br>
          <button className="btn btn-primary" disabled={pwd2 !== pwd} onClick={() => dispatch(registerAsync({ user, pwd, email, pwd2 }))}>Register</button>
        </div>}
      <br></br>
      <br></br>
      {status === "faild" ? (
        <div>
          <h2 className="text-danger">The username already been used.</h2>
        </div>
      ) : ""}
    </div>
  )
}
