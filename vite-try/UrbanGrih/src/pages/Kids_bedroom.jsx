import React, { useEffect } from "react";

// Import kids' bedroom images
import kid1 from "../assets/pics/kid/kid1.jpg";
import kid2 from "../assets/pics/kid/kid2.jpg";
import kid3 from "../assets/pics/kid/kid3.jpg";
import kid4 from "../assets/pics/kid/kid4.jpg";
import kid5 from "../assets/pics/kid/kid5.jpg";
import kid6 from "../assets/pics/kid/kid6.jpg";
import kid7 from "../assets/pics/kid/kid7.jpg";
import kid8 from "../assets/pics/kid/kid8.jpg";
import kid9 from "../assets/pics/kid/kid9.jpg";
import kid10 from "../assets/pics/kid/kid10.jpg";
import kid11 from "../assets/pics/kid/kid11.jpg";
import kid12 from "../assets/pics/kid/kid12.jpg";

export default function KidsBedroom() {
  const images = [
    kid1, kid2, kid3, kid4, kid5, kid6,
    kid7, kid8, kid9, kid10, kid11, kid12
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
      <section id="kidsBedroomDesigns">
        <h2>Kid Bedroom Designs</h2>
        <p className="section-description">
          Explore our kids' room designs, where imagination meets functionality, creating fun, 
          safe, and inspiring spaces for children to learn and play.
        </p>
        <br /><br />

        <div className="design-gallery">
          {images.map((img, index) => (
            <figure className="hover-popup" key={index}>
              <img src={img} alt={`Kid's Room Design ${index + 1}`} />
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
