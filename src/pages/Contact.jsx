import React from 'react';

function Contact() {
  return (
    <div className="content-wrapper">
    <div className="content">
    <section>
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Whether you have a question about our designs, need assistance, or just want to share your thoughts, we're here to help. Reach out to us through any of the methods below.</p>
      
{/*       <h3>Phone</h3>
      <p>+91-7302888237</p>
 */}
      <h3>Email</h3>
      <p><a href="mailto:contact@moonlooks.com">contact@moonlooks.com</a></p>

      <h3>Address</h3>
      <p>URBAN GRIH<br/>
      Greater Noida,<br/>
      Uttar Pradesh</p>

      <h3>Social Media</h3>
      <p>Follow us on <a href="https://www.instagram.com/_moon_looks_" >Instagram</a> and connect with us on <a href="https://wa.me/7302888237" >WhatsApp</a> for the latest updates and design inspiration.</p>
    </section>
 </div>
  </div>

  );
}

export default Contact;
