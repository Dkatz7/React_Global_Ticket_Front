import React, { useEffect, useState } from 'react';
import { addEventAsync, selectEvents, getEventsAsync, delEventAsync, updEventAsync, selectEventByIdAsync, selectEvent } from '../Events/eventsSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link, useParams } from 'react-router-dom';
import { addToCartAsync } from '../Cart/cartSlice';
import { getImagesAsync, selectImages } from '../Images/imagesSlice';
import { MY_SERVER } from '../../env';
import { format } from 'date-fns';
import { selectLogged } from '../Login/loginSlice';
import styles from './Events.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlus, FaMinus } from "react-icons/fa";
import './Events.module.css'
import { Button } from 'react-bootstrap';


export function Events() {
  const params: any = useParams
  const events = useAppSelector(selectEvents);
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages)

  useEffect(() => {
  }, [params.evID])

  useEffect(() => {
    dispatch(getImagesAsync())
  }, [])

  useEffect(() => {
    dispatch(getEventsAsync())
  }, [])

  const [event_name, setevent_name] = useState("")
  const [location, setLocation] = useState("")
  const [price, setprice] = useState(0)
  const [quantity, setquantity] = useState(0)
  const [date_and_time, setdate_and_time] = useState("")
  const [description, setdescription] = useState("")
  const [image, setimage] = useState<number>(-1)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addEventAsync({
      date_and_time,
      event_name,
      location,
      price,
      quantity,
      description,
      image,
    }));
    setevent_name("");
    setLocation("");
    setprice(0);
    setquantity(0);
    setdate_and_time("");
    setdescription("");
    setimage(-1);
  }

  return (
    <div className="events-container">
      <h1>Events in my data: {events.length}</h1>
      <form className="event-form" onSubmit={handleSubmit}>
        <label htmlFor="event_name">Event Name:</label>
        <input id="event_name" value={event_name} onChange={(e) => setevent_name(e.target.value)} required />
        <label htmlFor="location">Location:</label>
        <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <label htmlFor="date_and_time">Date and Time:</label>
        <input id="date_and_time" type="datetime-local" value={date_and_time} onChange={(e) => setdate_and_time((e.target.value))} required />
        <label htmlFor="price">Price:</label>
        <input id="price" type="number" step="1" value={price} onChange={(e) => setprice(+e.target.value)} required />
        <label htmlFor="quantity">Quantity:</label>
        <input id="quantity" type="number" step="1" value={quantity} onChange={(e) => setquantity(+e.target.value)} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setdescription(e.target.value)} required></textarea>
        <label htmlFor="image">Image:</label>
        <select id="image" value={image} onChange={(e) => setimage(+e.target.value)} required>
          <option value={-1}>Select an image</option>
          {images.map((img) => (
            <option key={img.id} value={img.id}>
              {img.title}
              </option>))}
        </select>
        selected imgae:
        {images.map((img)=> img.id==image? (<img key={img.id} width={300} height={200} src={(MY_SERVER) + (img.image)}></img>):null)}
        <button type="submit">Add Event</button>
      </form>
      <br></br>
      <div className="event-list">
        {events.map((event) => (  
          <div key={event.id} className="event-card">
            <br></br>
            <h2>{event.event_name}</h2>
            <p>Location: {event.location}</p>
            <p>Date: {new Date(event.date_and_time).toLocaleString()}</p>
            <p>Price: ${event.price}</p>
            <p>{event.quantity} tickets left</p>
            <>
              {images.map((img) => (
                <div key={img.id}>
                  {img.id === event.image ? (<img width={400} height={300} src={(MY_SERVER) + (img.image)} alt="event" />) : null}
                </div>
              ))}</>
            <p>{event.description}</p>
            <button className="btn btn-danger mr-2" onClick={() => {
              setShowDeleteConfirmation(true);
              setEventToDelete(event.id || -1);
            }}>Delete event</button>
            <button className="btn btn-primary mr-2" onClick={() => dispatch(updEventAsync({
              id: event.id,
              date_and_time: date_and_time,
              event_name: event_name,
              location: location,
              price: price,
              quantity: quantity,
              description: description,
              image: image,
            }))}>Update Event</button>
            <br></br>
          </div>
        ))}
      </div>
      {
        showDeleteConfirmation && (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this event?</p>
            <button className="btn btn-danger mr-2" onClick={() => {
              dispatch(delEventAsync(eventToDelete));
              setShowDeleteConfirmation(false);
            }}>Yes</button>
            <button className="btn btn-dark mr-2" onClick={() => {
              setShowDeleteConfirmation(false);
              setEventToDelete(0);
            }}>No</button>
          </div>
        )
      }
    </div >
  );
}

export function ShowEvents() {
  const params: any = useParams
  const events = useAppSelector(selectEvents);
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages)

  useEffect(() => {
  }, [params.evID])
  useEffect(() => {
    dispatch(getEventsAsync())
  }, [])
  useEffect(() => {
    dispatch(getImagesAsync())
  }, [])

  return (
    <div className="container">
      <h1>Close Events: {events.length}</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {events.map((ev, i) => (
          <div key={i} className="col">
            <div className={styles["event-card"]}>
              {images.map((im, i) => (
                <div key={i}>
                  {im.id === ev.image && (
                    <img src={MY_SERVER + im.image} className={styles["card-img-top"]} alt={ev.event_name} />
                  )}
                </div>
              ))}
              <div className={styles["card-body"]}>
                <h1 className={styles["card-title"]}>{ev.event_name}</h1>
                <p className={styles["card-text"]}>Location: {ev.location}</p>
                <p className={styles["card-text"]}>Date: {format(new Date(ev.date_and_time), "yyyy.MM.dd 'Time:' HH:mm")}</p>
                <p className={styles["card-text"]}>Quantity: {ev.quantity}</p>
                <p className={styles["card-text"]}>Price: {ev.price}</p>
                <div className="d-grid gap-2">
                  <Link to={'../events/' + ev.id} className="btn btn-primary">More Details</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ShowEvent() {
  const { evId } = useParams<{ evId: string }>();
  const dispatch = useAppDispatch();
  const eventId = parseInt(evId || '0');
  const event = useAppSelector((state) => selectEvent(state, eventId));
  const itemid: number = Number(evId)
  const images = useAppSelector(selectImages)
  const logged = useAppSelector(selectLogged)

  const [cartQuantity, setCartQuantity] = useState(1);

  const incrementQuantity = () => {
    setCartQuantity(cartQuantity + 1);
  };

  const decrementQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
  };

  useEffect(() => {
    dispatch(selectEventByIdAsync(eventId))
  }, [dispatch, evId])

  if (!event) {
    return (
      <div>
        <h1>Event not found</h1>
      </div>
    )
  }
  const date = new Date(event.date_and_time);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="container my-5">
      <ToastContainer
        position="top-right"
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
      <div className="card mb-5">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="card-body">
              <h1 className="card-title">{event.event_name}</h1>
              <h2 className="card-text">Location: {event.location}<br></br><br></br>
                Date: {formattedDate}{",  "}
                Time: {formattedTime}<br></br><br></br>
                Price: {event.price}<br></br><br></br>
                Tickets avalible: {event.quantity}
              </h2>
              <p id="description" >Description: {event.description}</p>
            </div>
          </div>
          <div className="col-md-6">
            {images.map((im, i) => (
              <div key={i} className={styles.body}>
                {im.id === event.image ? (<img src={MY_SERVER + im.image} width="100%" height="100%" alt={im.alt_text}></img>) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <label className="me-3">Tickets:</label>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={decrementQuantity}
                disabled={cartQuantity === 1}
              >
                <FaMinus />
              </button>
              <p className="mx-3">{cartQuantity}</p>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={incrementQuantity}
                disabled={cartQuantity === event.quantity}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {logged ? (
            <button
              className="btn btn-primary"
              onClick={() =>
                dispatch(
                  addToCartAsync({ itemid: event.id, quantity: cartQuantity })
                )
              }
              disabled={cartQuantity > event.quantity}
            >
              Add to Cart
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login to Add to Cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
