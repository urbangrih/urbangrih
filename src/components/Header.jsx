import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaUserCircle } from "react-icons/fa";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header>
        <div className="left-header">
          <img src={logo} alt="URBAN GRIH Logo" className="logo" />
          <h3>URBAN GRIH</h3>
        </div>

        {/* Hamburger (mobile only via CSS) */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={menuOpen ? 'active' : ''}>
          <ul>
            {/* Main nav links */}
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li>
              <Link to="/design" onClick={() => setMenuOpen(false)} className='design-button'>Design</Link>
              <ul className="dropdown">
                {/* <li><Link to="/villas-floor-plans" onClick={() => setMenuOpen(false)}>Villas Floor Plans</Link></li> */}
                {/* <li><Link to="/flats-floor-plans" onClick={() => setMenuOpen(false)}>Flats Floor Plans</Link></li> */}
                <li className='dropdown-item'>
                  <h3>Architect Design</h3>
                  <ul className='item-list'>
                    <li><Link to="/architechture-1" onClick={() => setMenuOpen(false)}>Architechture 1</Link></li>
                    <li><Link to="/architechture-2" onClick={() => setMenuOpen(false)}>Architechture 2</Link></li>
                    <li><Link to="/architechture-3" onClick={() => setMenuOpen(false)}>Architechture 3</Link></li>
                  </ul>
                </li>
                <li className='divider'><div className="divider-line"></div></li>
                <li className='dropdown-item'>
                  <h3>Interior Design</h3>
                  <ul className='item-list'>
                    <li><Link to="/interior-1" onClick={() => setMenuOpen(false)}>Interior 1</Link></li>
                    <li><Link to="/interior-2" onClick={() => setMenuOpen(false)}>Interior 2</Link></li>
                    <li><Link to="/interior-3" onClick={() => setMenuOpen(false)}>Interior 3</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>

            {/* Extra links ONLY in mobile hamburger */}
            {isMobile && (
              <>
                <li><Link to="/team" onClick={() => setMenuOpen(false)}>Our Team</Link></li>
                {isLoggedIn && (
                  <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                )}
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <FaUserCircle size={22} color="rgba(62,19,44, 0.8)" />
                </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className='user-panel'>
          <ul>
              <li><Link to="/team">Our Team</Link></li>
              {isLoggedIn && (
                <li><Link to="/dashboard">Dashboard</Link></li>
              )}
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <FaUserCircle size={22} color="rgba(0, 0, 0, 1)" />
                </Link>
              </li>
          </ul>
        </div>
      </header>

      {/* Sub-nav bar ONLY in desktop */}
      {/* {!isMobile && (
        <div className="sub-nav-bar">
          <nav className="sub-nav">
            <ul>
              <li><Link to="/team">Our Team</Link></li>
              {isLoggedIn && (
                <li><Link to="/dashboard">Dashboard</Link></li>
              )}
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <FaUserCircle size={22} color="rgba(255, 255, 255, 1)" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )} */}
    </>
  );
}

export default Header;
