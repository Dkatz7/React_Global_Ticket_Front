import React from 'react';
import styles from './Contact.module.css'; // Import the CSS module

export function ContactPage(){
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <p>For any inquiries or support, please contact us:</p>
      <p>Email: contact@example.com</p>
      <p>Phone: +1 123-456-7890</p>
      {/* Add a contact form here */}

      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe73C1qF3wPMB6gcxQf5ZO4ZIAo7pCuD4jpVCzNLwsTL8fGLw/viewform?embedded=true" width="640" height="1200" frameborder="0" marginheight="0" marginwidth="0">Loding...</iframe>
    </div>
  );
};

export default ContactPage;
