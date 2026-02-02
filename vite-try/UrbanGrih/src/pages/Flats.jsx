import React, { useState } from 'react';
import '../index.css';

// Import images from your assets folder
import flat1 from '../assets/flatdesign1.jpg';
import flat2 from '../assets/flatdesign2.jpg';

const FlatsFloorPlans = () => {
  const [popupImage, setPopupImage] = useState(null);

  const openPopup = (hdImage) => {
    setPopupImage(hdImage);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const flatDesigns = [
    { src: flat1, hd: flat1, caption: '2120 Sq.Ft' },
    { src: flat2, hd: flat2, caption: '1520 Sq.Ft' },
    // Add more as needed
  ];

  return (
    <div className="content-2">
      <section id="flatsFloorPlans">
        <h2>Flats Floor Plans</h2>
        <p>Discover our premium collection of luxury designs, where elegance meets sophistication.</p>

        <div className="design-gallery">
          {flatDesigns.map((design, index) => (
            <figure className="hover-popup" key={index}>
              <img
                src={design.src}
                alt={`Flat Design ${index + 1}`}
                onClick={() => openPopup(design.hd)}
              />
              <figcaption>{design.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Popup View */}
      {popupImage && (
        <div className="popup" onClick={closePopup}>
          <img src={popupImage} alt="HD View" />
        </div>
      )}

      {/* AI Chat Widget */}
      <script
        src="https://widget.cxgenie.ai/widget.js"
        data-aid="bac054ad-1035-4a6e-94af-dfe12376fb0c"
        data-lang="en"
      ></script>
    </div>
  );
};

export default FlatsFloorPlans;
