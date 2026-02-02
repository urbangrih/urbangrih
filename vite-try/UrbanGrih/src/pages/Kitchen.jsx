import React, { useEffect } from "react";

// Import all kitchen images
import kit1 from "../assets/pics/kit/kit1.jpg";
import kit2 from "../assets/pics/kit/kit2.jpg";
import kit3 from "../assets/pics/kit/kit3.jpg";
import kit4 from "../assets/pics/kit/kit4.jpg";
import kit5 from "../assets/pics/kit/kit5.jpg";
import kit6 from "../assets/pics/kit/kit6.jpg";
import kit7 from "../assets/pics/kit/kit7.jpg";
import kit8 from "../assets/pics/kit/kit8.jpg";
import kit9 from "../assets/pics/kit/kit9.jpg";
import kit10 from "../assets/pics/kit/kit10.jpg";

export default function KitchenDesigns() {
  const images = [
    kit1, kit2, kit3, kit4, kit5,
    kit6, kit7, kit8, kit9, kit10
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
      <section id="kitchenDesigns">
        <h2>Kitchen</h2>
        <p className="section-description">
          Explore our kitchen designs, combining functionality with style to
          create a welcoming, efficient, and beautifully crafted heart of your home.
        </p>
        <br /><br />
        
        <div className="design-gallery">
          {images.map((img, i) => (
            <figure className="hover-popup" key={i}>
              <img src={img} alt={`Kitchen Design ${i + 1}`} />
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
