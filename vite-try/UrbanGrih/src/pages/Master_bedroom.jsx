import React, { useEffect } from "react";

// Import all master bedroom images
import bed1 from "../assets/pics/bed/bed1.jpg";
import bed2 from "../assets/pics/bed/bed2.jpg";
import bed3 from "../assets/pics/bed/bed3.jpg";
import bed4 from "../assets/pics/bed/bed4.jpg";
import bed5 from "../assets/pics/bed/bed5.jpg";
import bed6 from "../assets/pics/bed/bed6.jpg";
import bed7 from "../assets/pics/bed/bed7.jpg";
import bed8 from "../assets/pics/bed/bed8.jpg";
import bed9 from "../assets/pics/bed/bed9.jpg";
import bed10 from "../assets/pics/bed/bed10.jpg";

export default function MasterBedroom() {
  const images = [
    bed1, bed2, bed3, bed4, bed5,
    bed6, bed7, bed8, bed9, bed10
  ];

  useEffect(() => {
    // Load AI Chatbox Script dynamically
    const script = document.createElement("script");
    script.src = "https://widget.cxgenie.ai/widget.js";
    script.dataset.aid = "bac054ad-1035-4a6e-94af-dfe12376fb0c";
    script.dataset.lang = "en";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="content">
      <section id="masterBedroomDesigns">
        <h2>Master Bedroom Designs</h2>
        <p className="section-description">
          Discover bedroom designs that blend comfort and elegance, creating a serene retreat tailored for relaxation and personal style.
        </p>
        <br /><br />

        <div className="design-gallery">
          {images.map((img, index) => (
            <figure className="hover-popup" key={index}>
              <img src={img} alt={`Master Bedroom Design ${index + 1}`} />
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
