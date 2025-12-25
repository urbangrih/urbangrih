import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import design1 from '../assets/design1.jpg';
import design2 from '../assets/design2.jpg';
import design3 from '../assets/design3.jpg';
import design4 from '../assets/design4.jpg';
import design5 from '../assets/design5.jpg';


import '../index.css';

const VillasFloorPlans = () => {
  const [popupImage, setPopupImage] = useState(null);

  const openPopup = (image) => {
    setPopupImage(image);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const designs = [
    { src: design1, caption: '36*50' },
    { src: design2, caption: '50*50' },
    { src: design3, caption: '50*50' },
    { src: design4, caption: '36*50' },
    { src: design5, caption: '25*55' },
  ];

  return (
    <div className="villas-page">        

      <div className="content-2">
        <section id="villasFloorPlans">
          <h2>Villas Floor Plans</h2>
          <p>Explore our range of functional and aesthetically pleasing normal designs.</p>
          <div className="design-gallery">
            {designs.map((design, index) => (
              <figure className="hover-popup" key={index}>
                <img
                  src={design.src}
                  alt={`Design ${index + 1}`}
                  onClick={() => openPopup(design.src)}
                />
                <figcaption>{design.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Popup container */}
        {popupImage && (
          <div className="popup" onClick={closePopup}>
            <img src={popupImage} alt="HD View" />
          </div>
        )}
      </div>

      {/* AI Chatbox */}
      <script
        src="https://widget.cxgenie.ai/widget.js"
        data-aid="bac054ad-1035-4a6e-94af-dfe12376fb0c"
        data-lang="en"
      ></script>

     
    </div>
  );
};

export default VillasFloorPlans;
