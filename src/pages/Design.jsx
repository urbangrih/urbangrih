import React from 'react';
import '../index.css';

// import design1 from '../assets/design1.jpg';
// import design2 from '../assets/design2.jpg';
// import design3 from '../assets/design3.jpg';
// import design4 from '../assets/design4.jpg';
// import design5 from '../assets/design5.jpg';

// import flatDesign1 from '../assets/flatdesign1.jpg';

const Design = () => {
  // const handleImageClick = (hdSrc) => {
  //   const popup = document.getElementById('popup');
  //   const popupImg = document.getElementById('popup-img');
  //   popupImg.src = hdSrc;
  //   popup.style.display = 'flex';
  // };

  const closePopup = () => {
    document.getElementById('popup').style.display = 'none';
  };

  return (
    <div className="content-2 design-content">
      <section id="architectDesigns" className='design-section'>
        {/* <h2>Villas Floor Plans</h2>
        <p>Explore our range of functional and aesthetically pleasing normal designs.</p>
        <div className="design-gallery">
          {[
            { src: design1, design1, caption: '36 × 50' },
            { src: design2, design2, caption: 'Cozy Bedroom' },
            { src: design3, design3, caption: 'Spacious Kitchen' },
            { src: design4, design4, caption: 'Living Room' },
            { src: design5, design5, caption: 'Modern Office' },
          ].map((img, idx) => (
            <figure className="hover-popup" key={idx}>
              <img
                src={img.src}
                alt={img.caption}
                onClick={() => handleImageClick(img.hd)}
              />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div> */}
        <h3>Architect Design</h3>
        <ul className="design-options">
            <li>Architechture 1</li>
            <li>Architechture 2</li>
            <li>Architechture 3</li>
        </ul>
      </section>

      <section id="interiorDesigns" className='design-section'>
        {/* <h2>Flats Floor Plans</h2>
        <p>Discover our premium collection of luxury designs, where elegance meets sophistication.</p>
        <div className="design-gallery">
          {[1, 2].map((num) => (
            <figure className="hover-popup" key={num}>
              <img
                src={flatDesign1}
                alt={`Flat Design ${num}`}
                onClick={() => handleImageClick(flatDesign1)}
              />
              <figcaption>2120 Sq.Ft</figcaption>
            </figure>
          ))}
        </div> */}
        <h3>Interior Design</h3>
        <ul className='design-options'>
          <li>Interior 1</li>
          <li>Interior 2</li>
          <li>Interior 3</li>
        </ul>
      </section>

      {/* HD Popup Image */}
      <div id="popup" className="popup" onClick={closePopup}>
        <img id="popup-img" src="" alt="HD View" />
      </div>

      {/* AI Chatbox (optional) */}
      <script
        src="https://widget.cxgenie.ai/widget.js"
        data-aid="bac054ad-1035-4a6e-94af-dfe12376fb0c"
        data-lang="en"
      ></script>
    </div>
  );
};

export default Design;
