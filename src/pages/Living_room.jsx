import React, { useEffect } from "react";

// Import all images
import liv1 from "../assets/pics/liv/liv1.jpg";
import liv2 from "../assets/pics/liv/liv2.jpg";
import liv3 from "../assets/pics/liv/liv3.jpg";
import liv4 from "../assets/pics/liv/liv4.jpg";
import liv5 from "../assets/pics/liv/liv5.jpg";
import liv6 from "../assets/pics/liv/liv6.jpg";
import liv7 from "../assets/pics/liv/liv7.jpg";
import liv8 from "../assets/pics/liv/liv8.jpg";
import liv9 from "../assets/pics/liv/liv9.jpg";
import liv10 from "../assets/pics/liv/liv10.jpg";

export default function LivingRoomDesigns() {
  const images = [
    liv1, liv2, liv3, liv4, liv5,
    liv6, liv7, liv8, liv9, liv10
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cxgenie.ai/widget.js";
    script.dataset.aid = "bac054ad-1035-4a6e-94af-dfe12376fb0c";
    script.dataset.lang = "en";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="content">
      <section id="villasFloorPlans">
        <h2>Living Room Designs</h2>
        <p className="section-description">
          Discover our curated selection of living room designs, crafted for
          elegance and comfort.
        </p>

        <div className="design-gallery">
          {images.map((img, i) => (
            <figure className="hover-popup" key={i}>
              <img src={img} alt={`Living Room Design ${i + 1}`} />
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
