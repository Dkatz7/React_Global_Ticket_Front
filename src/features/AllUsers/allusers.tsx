import React, { useEffect, useState } from 'react';
import { getUsersAsync, selectallusers, selectstatus } from './allusersSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectIsAdmin, selectLogged } from '../Login/loginSlice';
import { selectTmploggedUser } from '../Login/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import styles from "./AllUsers.module.css"
import 'bootstrap/dist/css/bootstrap.css';

export const AllUsers = () => {
  const users = useAppSelector(selectallusers || []);
  const logged = useAppSelector(selectLogged);
  const dispatch = useAppDispatch();
  const isadmin = useAppSelector(selectIsAdmin)
  const user = useAppSelector(selectTmploggedUser)
  const status = useAppSelector(selectstatus)
  const [showTable, setShowTable] = useState(false);


  useEffect(() => {
    dispatch(getUsersAsync(user))
  }, [])

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div>
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
      <div>
        <h1>List of all users</h1>

        {isadmin ?
          <div>
            <button className="btn btn-primary" onClick={toggleTable}>
              {showTable ? `Hide Users's List` : `Show Users's list`}
            </button>
            {showTable && (
              <table className="container text-center table" id="users">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Date joined</th>
                    <th>SuperUser</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i}>
                      <>
                        <td>
                          {user.id}
                        </td>
                        <td>
                          {user.username}
                        </td>
                        <td>{user.email}</td>
                        <td>
                          {new Date(user.date_joined).toLocaleDateString("en-US")}
                          {", "}
                          {new Date(user.date_joined).toLocaleTimeString("en-US")}</td>
                        <td>{user.is_superuser?("True"):"False"}</td></>
                    </tr>))}
                </tbody>
              </table>
            )}
          </div>
          : <h1>You must signin as admin to see lists of all users </h1>}
      </div>
    </div >
  )
}

