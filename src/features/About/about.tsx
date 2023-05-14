import React from 'react';
import styles from './About.module.css';
import companyImage from './company-image.jpg';

export function AboutUs() {
  return (
    <div className={styles["about-container"]}>
      <h1 className={styles["company-name"]}>Global Ticket</h1>

      <section className={styles["mission-statement"]}>
        <h1 className={styles["company-name"]}>About Our Company</h1>
        <p className={styles["about-section"]}>
          Welcome to GlobalTickets - the leading online platform for purchasing tickets to performances and events worldwide. At GlobalTickets, we are passionate about providing our customers with access to the best events in the world, making it easy and convenient for you to purchase tickets from the comfort of your own home.
        </p>
      </section>

      <section className={styles["mission-statement"]}>
        <h2 className={styles["section-heading"]}>Mission Statement and Values</h2>
        <p className={styles["about-section"]}>
          Our mission at GlobalTickets is simple: to connect you with the performances and events you love. We believe that attending live performances can be a life-changing experience, and we want to make sure that you have access to the widest possible range of events at the best possible prices.
        </p>
      </section>

      <section className={styles["history-section"]}>
        <h2 className={styles["section-heading"]}>Brief History</h2>
        <p className={styles["about-section"]}>
          GlobalTickets was founded in 2010 by a team of seasoned professionals with a deep passion for the arts and live entertainment. Since then, we have grown rapidly, expanding our range of events and performances to include everything from concerts and theater productions to sporting events and festivals.
        </p>
      </section>

      <section id='team-member' className={styles["team-section"]}>
        <h2 className={styles["section-heading"]}>Meet Our Team</h2>
        <p className={styles["about-section"]}>
          At GlobalTickets, we believe that our success is driven by our team of talented and dedicated professionals. Our team includes experts in marketing, sales, customer service, and technology, all of whom are committed to providing our customers with an exceptional experience.
        </p>
        <div className={styles["team-member-carousel"]}>
          <div className={styles["team-member-slide"]}>
            <img src={require("./AC.jpg")} alt="Avi Cohen" />
          </div>
          <div className={styles["team-member-slide"]}>
            <img src={require("./MS.jpg")} alt="Moti Simha" />
          </div>
          <div className={styles["team-member-slide"]}>
            <img src={require("./DH.jpg")} alt="Dima Hackerman" />
          </div>
        </div>
      </section>

      <section className={styles["testimonials-section"]}>
        <h2 className={styles["section-heading"]}>Testimonials</h2>
        <p className={styles["about-section"]}>
          But don't just take our word for it - here are some testimonials from our satisfied customers:
        </p>
        <p className={styles["about-section"]}>
          "I have been using GlobalTickets for years, and they never disappoint. They always have the best seats at the best prices, and their customer service is top-notch." - Jane D.
        </p>
        <p className={styles["about-section"]}>
          "GlobalTickets has completely changed the way I purchase tickets to events. I used to spend hours waiting in line or navigating different websites, but now I can find everything I need in one place." - John S.
        </p>
        {/* <div className={styles["testimonial"]}>
          <img src="[Insert case study image URL]" alt="Case Study Name" />
          <img src="[Insert case study image URL]" alt="Case Study Name" />
          <img src="[Insert case study image URL]" alt="Case Study Name" />
        </div> */}
        <p className={styles["about-section"]}>
          So whether you're a die-hard music fan, a theater enthusiast, or just looking for a fun night out, GlobalTickets has you covered. Thank you for choosing us as your go-to source for tickets to the world's best performances and events.
        </p>
      </section>

      <section>
        <a href="[Insert contact page URL]">
          <button className={styles["contact-button"]}>Contact Us</button>
        </a>
      </section>

    </div>
  );
};