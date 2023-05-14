// Import necessary dependencies and Redux hooks
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectEvents } from '../../features/Events/eventsSlice';
import { useAppSelector } from '../../app/hooks';
import { selectImages } from '../Images/imagesSlice';
import { MY_SERVER } from '../../env';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Import the CSS module
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


// Define the Home Page component
export function Home() {
  const dispatch = useDispatch();
  const upcomingEvents = useAppSelector(selectEvents)
  const images = useAppSelector(selectImages)

  return (
    <div className={styles.container}>
      {/* // Header Section */}
      <header className={styles.header}>
        {/* Display app information */}
        <h1 >Global Ticket - Explore and Connect</h1>
        <p>Discover Exciting Events and Connect with Like-minded People</p>
      </header>

      <section className={styles.section}>
        <h2>About</h2>
        <p>Welcome to our event management platform, where we bring unforgettable experiences to life! At Global Ticket, we are passionate about creating and hosting exceptional events that leave a lasting impression on our attendees.</p>
        <p>With years of experience in the industry, our team of dedicated professionals is committed to delivering high-quality events that cater to a wide range of interests and preferences. Whether you're a music lover, a sports enthusiast, a tech geek, or an art connoisseur, we have something extraordinary in store for you.</p>
        <p>Our mission is to curate a diverse array of events that inspire, entertain, and connect people from all walks of life. From thrilling concerts and captivating exhibitions to exciting sports matches and thought-provoking conferences, we strive to provide an unparalleled experience for every attendee.</p>
        <p>Join us on this incredible journey as we celebrate the joy of shared experiences, create lifelong memories, and foster a vibrant community of event enthusiasts. Get ready to immerse yourself in the world of unforgettable moments and discover the magic that awaits you at Global Ticket!</p>
      </section>

      {/* Upcoming Event */}
      <section className={styles.section}>
        <h2>Upcoming Event</h2>
        {upcomingEvents
          .filter((event) => new Date(event.date_and_time) >= new Date()) // Filter out events that have passed
          .sort((a, b) => new Date(a.date_and_time).getTime() - new Date(b.date_and_time).getTime()) // Sort events by date
          .slice(0, 1) // Take only the closest event
          .map((event) => (
            <div key={event.id}>
              <>
                {images.map((img) => (
                  <div key={img.id}>
                    {img.id === event.image ? (<img width={400} height={300} src={(MY_SERVER) + (img.image)} alt="event" />) : null}
                  </div>
                ))}</>
              <h3>{event.event_name}</h3>
              <p>{event.description.length > 150 ? event.description.substring(0, 150) + '...' : event.description}</p>
              <div className="d-grid gap-2">
                <Link to={'../events/' + event.id} className="btn btn-primary">More Details</Link>
              </div>
            </div>
          ))
        }
      </section >

      {/* Call to Action */}
      <section className={styles.section}>
        <h2>Explore events</h2>
        <p>Experience amazing events!</p>
        <div className="carousel-wrapper">
          <Carousel showArrows={true} infiniteLoop={true} showThumbs={false} autoPlay={true} interval={3000}>
            {upcomingEvents
              .filter((event) => new Date(event.date_and_time) >= new Date())
              .sort((a, b) => new Date(a.date_and_time).getTime() - new Date(b.date_and_time).getTime())
              .slice(1) // Display only the next 4 events (excluding the closest one)
              .map((event) => (
                <div key={event.id}>
                  <>
                    {images.map((img) => (
                      <div key={img.id}>
                        {img.id === event.image ? (<img width={400} height={300} src={(MY_SERVER) + (img.image)} alt="event" />) : null}
                      </div>
                    ))}
                  </>
                  <p>{event.event_name}</p>
                  <br></br>
                </div>
              ))
            }
          </Carousel>
        </div>
        <div className="d-grid gap-2">
          <Link to={'../events'} className="btn btn-primary">Explore Events</Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.section}>
        <h2>Contact Us</h2>
        <p>For any inquiries or support, please contact us:</p>
        <div className="d-grid gap-2">
          <Link to={'/contact'} className="btn btn-secondary">Contact Us</Link>
        </div>
      </section>
    </div >
  );
};

export default Home;
