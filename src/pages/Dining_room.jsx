import React, { useEffect } from "react";

// Import dining room images
import din1 from "../assets/pics/din/din1.jpg";
import din2 from "../assets/pics/din/din2.jpg";
import din3 from "../assets/pics/din/din3.jpg";
import din4 from "../assets/pics/din/din4.jpg";
import din5 from "../assets/pics/din/din5.jpg";
import din6 from "../assets/pics/din/din6.jpg";
import din7 from "../assets/pics/din/din7.jpg";
import din8 from "../assets/pics/din/din8.jpg";
import din9 from "../assets/pics/din/din9.jpg";
import din10 from "../assets/pics/din/din10.jpg";

export default function DiningRoom() {
  const images = [
    din1, din2, din3, din4, din5,
    din6, din7, din8, din9, din10
  ];

  useEffect(() => {
    // Inject AI Chatbox script
    const script = document.createElement("script");
    script.src = "https://widget.cxgenie.ai/widget.js";
    script.dataset.aid = "bac054ad-1035-4a6e-94af-dfe12376fb0c";
    script.dataset.lang = "en";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="content">
      <section id="diningRoomDesigns">
        <h2>Dining Room Designs</h2>
        <p className="section-description">
          Browse our dining room designs, crafted to bring warmth and style to gatherings, 
          where every meal becomes a memorable experience.
        </p>
        <br /><br />

        <div className="design-gallery">
          {images.map((img, index) => (
            <figure className="hover-popup" key={index}>
              <img src={img} alt={`Dining Room Design ${index + 1}`} />
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
