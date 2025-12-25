import React, { useState, useEffect } from "react";
import livingRoomImage from "../assets/living-room.png";
import kitchenImage from "../assets/kitchen.jpg";
import masterBedroomImage from "../assets/master-bedroom.png";
import diningRoomImage from "../assets/dining-room.png";
import kidsRoomImage from "../assets/kids-room.png";
import wardrobeImage from "../assets/wardrobe.jpg";
import CtoPhoto from "../assets/cto_photo.png";

const Home = () => {
  const [area, setArea] = useState(0);
  const [unit, setUnit] = useState("feet");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const [costType, setCostType] = useState(1450);
  const [floors, setFloors] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Dynamically add the AI Chatbox script
    const script = document.createElement("script");
    script.src = "https://widget.cxgenie.ai/widget.js";
    script.dataset.aid = "bac054ad-1035-4a6e-94af-dfe12376fb0c";
    script.dataset.lang = "en";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const calculateArea = () => {
    const calculatedArea = unit === "meters" ? length * width * 10.764 : length * width;
    setArea(calculatedArea);
  };

  const calculateTotalCost = () => {
    setTotalCost(costType * area * floors);
  };

  return (
    <div className="content-wrapper">
    <div className="content-1">
      <section id="home" className="hero-title">
      {/* <p>Welcome to URBAN GRIH! Our website is your go-to destination for innovative and personalized home design solutions. We specialize in helping you bring your dream home to life by offering a wide range of architectural and interior design options. Whether you are seeking modern, contemporary, or traditional styles, we provide an extensive collection of designs to match your unique taste and preferences.</p>
        <p>At URBAN GRIH, we understand that a home is more than just a structure; it's a reflection of your personality and lifestyle. Our team of skilled designers and architects work meticulously to create spaces that are not only aesthetically pleasing but also highly functional and comfortable. From initial concept to final execution, we are committed to delivering top-quality design services that cater to your specific needs.</p>
        <p>Explore our diverse portfolio to find inspiration and professional tips that will help you transform your living spaces. Our user-friendly platform allows you to browse through various design ideas, gather insights, and connect with our experts for personalized advice. Join us on this exciting journey and let URBAN GRIH be your partner in crafting a beautiful, stylish, and functional home that you and your family will love for years to come.</p>
        Add remaining text here */}
        <h3>Everything Your Home Needs<br /> — At One Place</h3>
      </section>
      <section className="hero-cta">
        <button>Start Your Project</button>
        <button>Find Professionals</button>
      </section>
    </div>
    <div className="content-2">
      {/* <br></br>
      <br></br>
      <br></br>
      <br></br> */}

      <div className="wrapper">
        <div className="design-grid">
          <a href="/living-room" className="design-card">
            <img src={livingRoomImage} alt="Living Room" />
            <div className="card-info">
              <h3>Living Room</h3>
            </div>
          </a>
          {/* Repeat similar structure for Kitchen, Master Bedroom, Dining Room, Kid's Bedroom, and Wardrobe */}          
          <a href="/kitchen" className="design-card">
            <img src={kitchenImage} alt="Kitchen" />
            <div className="card-info">
              <h3>Kitchen</h3>
            </div>
          </a>
          <a href="/master-bedroom" className="design-card">
            <img src={masterBedroomImage} alt="Master Bedroom" />
            <div className="card-info">
              <h3>Master Bedroom</h3>
            </div>
          </a>
          <a href="/dining-room" className="design-card">
            <img src={diningRoomImage} alt="Dining Room" />
            <div className="card-info">
              <h3>Dining Room</h3>
            </div>
          </a>
          <a href="/kids-room" className="design-card">
            <img src={kidsRoomImage} alt="Kid's Bedroom" />
            <div className="card-info">
              <h3>Kid's Bedroom</h3>
            </div>
          </a>
          <a href="/wardrobe" className="design-card">
            <img src={wardrobeImage} alt="Wardrobe" />
            <div className="card-info">
              <h3>Wardrobe</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div className="content-3">
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="cal-wrapper">
        <div className="calculator-container area-calculator">
          <h1>Area Calculator</h1>
          <div className="result-section">
            <p>Result</p>
            <p>Area: {area.toFixed(2)} sq ft</p>
          </div>
          <div className="unit-section">
            <label>Select Unit:</label>
            <input type="radio" id="meters" name="unit" value="meters" onChange={() => setUnit("meters")} />
            <label htmlFor="meters">Meters</label>
            <input type="radio" id="feet" name="unit" value="feet" defaultChecked onChange={() => setUnit("feet")} />
            <label htmlFor="feet">Feet</label>
          </div>
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="length">Length (l)</label>
              <input
                type="number"
                id="length"
                placeholder="Enter length"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>
            <div className="input-group">
              <label htmlFor="width">Width (w)</label>
              <input
                type="number"
                id="width"
                placeholder="Enter width"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>
          </div>
          <button onClick={calculateArea}>Calculate Area</button>
        </div>

        <div className="calculator-container cost-calculator">
          <h1>Cost Calculator</h1>
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="type">Select Construction Type:</label>
              <select
                id="type"
                onChange={(e) => setCostType(Number(e.target.value))}
              >
                <option value="1450">Simple</option>
                <option value="2800">Moderate</option>
                <option value="5800">Luxury</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="floors">Number of Floors:</label>
              <input
                type="number"
                id="floors"
                min="1"
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="result-section cost-result">
            <h3>Total Estimated Cost: {totalCost} INR</h3>
          </div>
          <button onClick={calculateTotalCost}>Calculate Cost</button>
        </div>
      </div>
    </div>
    <div className="content-4">
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="professional-form-section">
        <h2>Get Started with Your Project</h2>
        <form action="/submit_project_form" method="post">
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" placeholder="Your Name" required />
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" placeholder="Your Email" required />
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" placeholder="Your Phone Number" required />
          <label htmlFor="project-type">Type of Project:</label>
          <select id="project-type" required>
            <option value="Floor Planning">Floor Plans</option>
            <option value="Interior">Interior Design</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="details">Project Details:</label>
          <textarea id="details" rows="4" placeholder="Briefly describe your project requirements..."></textarea>
          <button type="submit">Submit Your Requirements</button>
        </form>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="ceo-cto-container">
        <img src={CtoPhoto} alt="CEO & CTO Photo" className="ceo-cto-photo" />
        <div className="message">
          <h3>Message from the Founder & CTO</h3>
          <p>At URBAN GRIH, we believe that great design has the power to transform lives. Our mission is to bring your vision to life by creating beautiful and functional spaces that truly reflect your unique style and needs. We are passionate about delivering exceptional design solutions and are committed to providing our clients with an outstanding experience from start to finish.</p>
          <p>Thank you for choosing URBAN GRIH. We look forward to working with you to create the home of your dreams.</p>
          <p><strong>UJJWAL KULSHRESTHA<br />Founder & CTO, URBAN GRIH</strong></p>
        </div>
      </div>
    </div>

    <br></br>
    <br></br>
    <br></br>
    <br></br>

    </div>

    
  );
};

export default Home;
