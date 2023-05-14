import React, { useEffect, useState } from 'react';
import { adduserinfoAsync, getuserinfoAsync, uduserinfoAsync, deluserinfoAsync } from './userinfoSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserinfo, selectInfocompleted, selectInfoId } from "../Userinfo/userinfoSlice"
import { selectUserId } from '../Login/loginSlice';
import { selectTmploggedUser } from '../Login/loginSlice';
import { Purchasses } from '../Purchasses/purchases';
import 'bootstrap/dist/css/bootstrap.css';


export const Userinfo = () => {
  const informations = useAppSelector(selectUserinfo);
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectUserId)
  const username = useAppSelector(selectTmploggedUser)
  const infocompleted = useAppSelector(selectInfocompleted)
  const informationid = useAppSelector(selectInfoId)

  const [infoid, setinfoid] = useState(-1);
  const [user, seteuser] = useState("")
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [age, setage] = useState(-1)
  const [email, setemail] = useState("")
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [postalcode, setpostalcode] = useState("");

  useEffect(() => {
    dispatch(getuserinfoAsync());
    updateinfouser();
  }, [])

  const updateinfouser = (() => {
    if (Array.isArray(informations)) {
      informations.map((info, i) => (
        setfirstname(info.firstname),
        setlastname(info.lastname),
        setage(info.age),
        setemail(info.email),
        setcity(info.city),
        setaddress(info.address),
        setpostalcode(info.postalcode),
        setinfoid(Number(info.id))
      ))
    }
  }
  )
  return (
    <div>
      {id ? (
        <div className="container">
          <h1>Your purchasses:</h1>
          <Purchasses></Purchasses>
          {/* <h1>len: {informations.length}</h1> */}
          <br></br>
          {id ? (
            <><div className="row">
              {Array.isArray(informations) ? (
                <div className="col" >
                  {informations.map((info, i) => (
                    <div className="card" key={i} style={{ display: "flex", textAlign: 'left' }}>
                      <div className="card-header">Privete Information</div>
                      <div className="card-body">
                        <h5 className="card-title">User name: {username}</h5>
                        <p className="card-text">First name: {info.firstname}</p>
                        <p className="card-text">Last name: {info.lastname}</p>
                        <p className="card-text">Age: {info.age}</p>
                        <p className="card-text">Email: {info.email}</p>
                        <p className="card-text">City: {info.city}</p>
                        <p className="card-text">Address: {info.address}</p>
                        <p className="card-text">Phone number: 0{info.postalcode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : ""}
            </div>
              {Array.isArray(informations) ? (
                <div className="col">
                  <br></br><br></br><div>
                    {informations.map((info, i) => (
                      <div className="card" key={i} style={{ textAlign: 'left' }}>
                      <div className="card-header">Update your profile:</div>  
                        <div className="card-body">
                          User: <input className="form-control" onChange={(e) => seteuser(e.target.value)} type="text" id="user" name='user' value={username} readOnly></input>
                          First name: <input className="form-control" onChange={(e) => setfirstname(e.target.value)} type="text" id="fname" name='fname' defaultValue={info.firstname}></input>
                          Last name: <input className="form-control" onChange={(e) => setlastname(e.target.value)} type="text" id="lname" defaultValue={info.lastname}></input>
                          Age: <input className="form-control" onChange={(e) => setage(Number(e.target.value))} type="number" id="age" defaultValue={info.age}></input>
                          Email: <input className="form-control" onChange={(e) => setemail(e.target.value)} type="email" id="email" defaultValue={info.email}></input>
                          City: <input className="form-control" onChange={(e) => setcity(e.target.value)} type="text" id="city" defaultValue={info.city}></input>
                          Address: <input className="form-control" onChange={(e) => setaddress(e.target.value)} type="text" id="address" defaultValue={info.address}></input>
                          Phone number: <input className="form-control" onChange={(e) => setpostalcode(e.target.value)} type="tel" id="phunmer" defaultValue={info.postalcode}></input>
                          <button className="btn btn-primary" onClick={() => dispatch(uduserinfoAsync({
                            user: id,
                            address,
                            age,
                            city,
                            email,
                            firstname,
                            lastname,
                            postalcode
                          }))}>Update user information</button>
                        </div>
                      </div>
                    ))}
                  </div></div>) : 
                  <div className="alert alert-danger" role="alert">"Your information as been updated! "</div>}
            </>) : "Please log in to see privet information"}
          {informations[0] ?(""):(
            <div className="col">
              <h2>Add your profile information:</h2>
              <br></br>
              User: <input className="form-control" onChange={(e) => seteuser(e.target.value)} type="text" id="user" name='user' value={username} readOnly></input>
              First name: <input className="form-control" onChange={(e) => setfirstname(e.target.value)} type="text" id="fname" name='fname' placeholder='first name'></input>
              Last name: <input className="form-control" onChange={(e) => setlastname(e.target.value)} type="text" id="lname" placeholder='last name'  ></input>
              Age: <input className="form-control" onChange={(e) => setage(Number(e.target.value))} type="number" id="age" placeholder='age'></input>
              Email: <input className="form-control" onChange={(e) => setemail(e.target.value)} type="email" id="email" placeholder='email'></input>
              City: <input className="form-control" onChange={(e) => setcity(e.target.value)} type="text" id="city" placeholder='city'></input>
              Address: <input className="form-control" onChange={(e) => setaddress(e.target.value)} type="text" id="address" placeholder='address'></input>
              Phone number: <input className="form-control" onChange={(e) => setpostalcode(e.target.value)} type="number" id="phunmer" placeholder='phone number'></input>
              <button className="btn btn-primary" onClick={() => dispatch(adduserinfoAsync({
                user: id,
                address,
                city,
                email,
                firstname,
                lastname,
                postalcode,
                age
              }))}>Add user information</button>
            </div>
          )}
          <div className="col">
            <h1>Deleting your account's information</h1>
            <button className="btn btn-danger" onClick={() => dispatch(deluserinfoAsync(informationid))}>Delete your account (all your information will be deleted)</button>
          </div>
        </div>)
        : (<h1>You must log in to see Private information!</h1>)}
    </div>
  )
}