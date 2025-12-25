import React from "react";

const Footer = () => {
  return (
    <footer className="professional-footer">
      <div className="footer-container">
        <div className="footer-section about-us">
          <h3>About Us</h3>
          <p>
            At URBAN GRIH, we specialize in architectural design, interior
            planning, and cost estimation for home building projects. Our
            commitment to quality ensures your dream space becomes a reality.
          </p>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/designs">Designs</a></li>
            <li><a href="/villas-floor-plans">Villas Floor Plans</a></li>
            <li><a href="/flats-floor-plans">Flats Floor Plans</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact-us">
          <h3>Contact Us</h3>
          <p>Email: contact@moonlooks.com</p>
          <p>Address: Greater Noida, Uttar Pradesh</p>
        </div>

        <div className="footer-section join-us">
          <h4>Join Us</h4>
          <div className="qr-code-wrapper">
 {/*             <div className="qr-container">
              <a
                href="https://www.instagram.com/moon.looks_?igsh=MTRuZDFtM2hrcTg3Zg=="
                target="_blank"
                rel="noopener noreferrer"
                title="Click to View"
              >
                <img
                  src={require("../assets/instagram_qr.png")}
                  alt="Instagram QR Code"
                  className="qr-code"
                />
                <span className="qr-hover-text">Click to View</span>
              </a>
              <p className="qr-label">Instagram</p>
            </div> */}
            <div className="qr-container">
              <a
                href="https://www.instagram.com/moon.looks_?igsh=MTRuZDFtM2hrcTg3Zg=="
                target="_blank"
                rel="noopener noreferrer"
                title="Click to View"
              >
                <img
                  src={require("../assets/instagram_qr.png")}
                  alt="Instagram QR Code"
                  className="qr-code"
                />
                <span className="qr-hover-text">Click to View</span>
              </a>
              <p className="qr-label">Instagram</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 URBAN GRIH. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
