import React, { useEffect, useState } from 'react';
import { getPurchassesAsync, selectallpurchasses, selectstatus } from './allpurchassesSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectIsAdmin, selectLogged } from '../Login/loginSlice';
import { selectTmploggedUser } from '../Login/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import styles from "./AllPurchasses.module.css"
import 'bootstrap/dist/css/bootstrap.css';

export const AllPurchassess = () => {
  const purchasses = useAppSelector(selectallpurchasses || []);
  const dispatch = useAppDispatch();
  const isadmin = useAppSelector(selectIsAdmin)
  const status = useAppSelector(selectstatus)
  const [showTable, setShowTable] = useState(false);


  useEffect(() => {
    dispatch(getPurchassesAsync())
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
              {showTable ? `Hide Users's List` : `Show all purchasses`}
            </button>
            {showTable && (
              <table className="container text-center table" id="purchasses">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>user</th>
                    <th>event</th>
                    <th>quantity</th>
                    <th>date</th>
                    <th>subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasses.map((pr, i) => (
                    <tr key={i}>
                      <>
                        <td>{pr.id}</td>
                        <td>{pr.user}</td>
                        <td>{pr.event}</td>
                        <td>{pr.quantity}</td>
                        <td>
                          {new Date(pr.date).toLocaleDateString("en-US")}
                          {", "}
                          {new Date(pr.date).toLocaleTimeString("en-US")}</td>
                        <td>{pr.subtotal}</td></>
                    </tr>))}
                </tbody>
              </table>
            )}
          </div>
          : <h1>You must signin as admin to see lists of purchasses </h1>}
      </div>
    </div >
  )
}

