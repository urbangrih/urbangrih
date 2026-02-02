import React from "react";
import LinkedIn_qr from "../assets/LinkedIn_QR.png";
import instagram_qr from "../assets/instagram_qr.png";

const Footer = () => {
    return (
        <footer className="professional-footer">
            <div className="footer-container">
                <div className="footer-section about-us">
                    <h3>About Us</h3>
                    <p>
                        At URBAN GRIH, we specialize in architectural design,
                        interior planning, and cost estimation for home building
                        projects. Our commitment to quality ensures your dream
                        space becomes a reality.
                    </p>
                </div>

                <div className="footer-section quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About Us</a>
                        </li>
                        <li>
                            <a href="/contact">Contact Us</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section contact-us">
                    <h3>Contact Us</h3>
                    <p>Email: urbangrih@gmail.com</p>
                    <p>Address: Agra, Uttar Pradesh</p>
                </div>

                <div className="footer-section join-us">
                    <h4>Join Us</h4>
                    <div className="qr-code-wrapper">
                        <div className="qr-container">
                            <a
                                href="https://www.linkedin.com/company/urbangrih/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Click to View"
                            >
                                <img
                                    src={instagram_qr}
                                    alt="Instagram QR Code"
                                    className="qr-code"
                                />
                                <span className="qr-hover-text">
                                    Click to View
                                </span>
                            </a>
                            <p className="qr-label">Instagram</p>
                        </div>
                        <div className="qr-container">
                            <a
                                href="https://www.instagram.com/urbangrih?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Click to View"
                            >
                                <img
                                    src={LinkedIn_qr}
                                    alt="Instagram QR Code"
                                    className="qr-code"
                                />
                                <span className="qr-hover-text">
                                    Click to View
                                </span>
                            </a>
                            <p className="qr-label">LinkedIn</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 URBAN GRIH. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
