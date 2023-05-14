import React, { useEffect, useState } from 'react';
import { getPurchassesAsync, selectstatuspurchasses, selectpurchasseslist } from './purchassesSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectLogged } from '../Login/loginSlice';
import { selectTmploggedUser } from '../Login/loginSlice';
import { getEventsAsync, selectEvents } from '../Events/eventsSlice';
import 'bootstrap/dist/css/bootstrap.css';
import './Purchasses.module.css';

export const Purchasses = () => {
  const purchasses = useAppSelector(selectpurchasseslist || []);
  const logged = useAppSelector(selectLogged);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectTmploggedUser)
  const status = useAppSelector(selectstatuspurchasses)
  const eventlist = useAppSelector(selectEvents)
  const [showTable, setShowTable] = useState(false);
  const [eventdate, seteventdate] = useState("")

  useEffect(() => {
    dispatch(getPurchassesAsync(user),)
  }, [])
  useEffect(() => {
    dispatch(getEventsAsync())
  }, [])

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div>
      {logged ?
        <div>
          <button className="btn btn-primary" onClick={toggleTable}>
            {showTable ? 'Hide Previous purchases' : 'Show Previous purchases'}
          </button>
          {showTable && (
            <table className="container text-center table" id="purchasse">
              <thead>
                <tr>
                  <th>Purchasse time</th>
                  <th>Event's name</th>
                  <th>Event's date</th>
                  <th>Total tickets</th>
                  <th>Total price</th>
                </tr>
              </thead>
              <tbody>
                {purchasses.map((item, i) => (
                  <tr key={i}>
                    <><td>
                      {new Date(item.date).toLocaleDateString("en-US")}
                      {", "}
                      {new Date(item.date).toLocaleTimeString("en-US")}</td>
                      <td>{eventlist.map((ev) => {
                        if (ev.id === item.event) {
                          return <span key={ev.id}>{ev.event_name}</span>;
                        }
                        return null;
                      })}</td>
                      <td>{eventlist.map((ev) => {
                        if (ev.id === item.event) {
                          return <span key={ev.id}>{new Date(ev.date_and_time).toLocaleDateString("en-US")}
                            {", "}
                            {new Date(ev.date_and_time).toLocaleTimeString("en-US")}</span>;
                        }
                        return null;
                      })}</td>
                      <td>{item.quantity}</td>
                      <td>{item.subtotal}</td></>
                  </tr>))}
              </tbody>
            </table>
          )}
        </div>
        : <h1>You must signin to see your purchasses </h1>}
    </div>
  )
} 
