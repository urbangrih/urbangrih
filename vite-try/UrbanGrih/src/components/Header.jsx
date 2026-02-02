import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_without_text-removebg-preview.png';
import { FaUserCircle } from "react-icons/fa";
import Dropdown  from './Dropdown';
import { NAV_DATA } from '../data/navigationData';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const menuRef = useRef(); 


  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handler = (e) => {
        // Ignore clicks on hamburger button
        if (e.target.closest('.hamburger')) {
          return;
        }
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
            // console.log("clicked outside");
        }
    }
    window.addEventListener("mousedown", handler)
    window.addEventListener("resize", handleResize);
    return () => {window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handler);
    };
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
          onClick={() => {setMenuOpen(!menuOpen)}}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav  className={menuOpen ? 'active' : ''}>
          <ul ref = {menuRef} className = "header-links">
            {/* Main nav links */}
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li>
              <Link to="/design" onClick={() => setMenuOpen(false)} className='nav-button'>Design</Link>
              {/* <ul className="two-col-dropdown">
                <li className='dropdown-item'>
                  <h3>Architect Design</h3>
                  <ul className='item-list'>
                    <li><Link to="/architechture-1" onClick={() => setMenuOpen(false)}>Architechture 1</Link></li>
                    <li><Link to="/architechture-2" onClick={() => setMenuOpen(false)}>Architechture 2</Link></li>
                    <li><Link to="/architechture-3" onClick={() => setMenuOpen(false)}>Architechture 3</Link></li>
                  </ul>
                </li>
                <li className='dropdown-item'>
                  <h3>Interior Design</h3>
                  <ul className='item-list'>
                    <li><Link to="/interior-1" onClick={() => setMenuOpen(false)}>Interior 1</Link></li>
                    <li><Link to="/interior-2" onClick={() => setMenuOpen(false)}>Interior 2</Link></li>
                    <li><Link to="/interior-3" onClick={() => setMenuOpen(false)}>Interior 3</Link></li>
                  </ul>
                </li>
              </ul> */}
              <Dropdown 
                section = {NAV_DATA.design}
                setMenuOpen={setMenuOpen}
              />
            </li>
            <li>
              <Link to="/experts" onClick={() => setMenuOpen(false)} className = 'nav-button'>Experts</Link>
              {/* <ul className="dropdown">
                <li className='dropdown-item'>
                  <Link to="/interior-designers" onClick={() => setMenuOpen(false)}>Interior Designers</Link>
                </li>
                <li className='dropdown-item'>
                  <Link to="/architects" onClick={() => setMenuOpen(false)}>Architects</Link>
                </li>
                <li className='dropdown-item'>
                  <Link to="/vastu-consultants" onClick={() => setMenuOpen(false)}>Vastu Consultants</Link>
                </li>
                <li className='dropdown-item'>
                  <Link to="/contractors" onClick={() => setMenuOpen(false)}>Contractors</Link>
                </li>
              </ul> */}
              <Dropdown 
                section = {NAV_DATA.experts}
                setMenuOpen={setMenuOpen}
              />
            </li>
            <li>
              <Link to="/materials" onClick={() => setMenuOpen(false)} className='nav-button'>Material</Link>
              {/* <ul className="dropdown">
                <li className='dropdown-item'>
                <Link to="/furniture" onClick={() => setMenuOpen(false)}>Furniture</Link>
                </li>
                <li className='dropdown-item'>
                <Link to="/modular-kitchen" onClick={() => setMenuOpen(false)}>Modular Kitchen</Link>
                </li>
                <li className='dropdown-item'>
                <Link to="/ligthing" onClick={() => setMenuOpen(false)}>Ligthing</Link>
                </li>
                <li className='dropdown-item'>
                <Link to="/tiles-flooring" onClick={() => setMenuOpen(false)}>Tiles and Flooring</Link>
                </li>
                <li className='dropdown-item'>
                <Link to="/paint-decor" onClick={() => setMenuOpen(false)}>Paint & Decor</Link>
                </li>
                <li className='dropdown-item'>
                <Link to="/hardware" onClick={() => setMenuOpen(false)}>Hardware</Link>
                </li>
              </ul> */}
              <Dropdown 
                section={NAV_DATA.materials}
                setMenuOpen={setMenuOpen}
              />
            </li>
            {/* <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li> */}
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
