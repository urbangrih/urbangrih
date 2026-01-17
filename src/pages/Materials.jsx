import React from 'react'

function Materials() {
  const closePopup = () => {
    document.getElementById('popup').style.display = 'none';
  };
  return (
    <div className="content-2 mobile-nav-option-content">
      <section id="architectDesigns" className='mobile-nav-option-section'>
        <h3>Architect Design</h3>
        <ul className="mobile-nav-options">
            <li>Furniture</li>
            <li>Modular Kitchen</li>
            <li>Lighting</li>
            <li>Tiles and Flooring</li>
            <li>Paint & Decor</li>
            <li>Hardware</li>
        </ul>
      </section>

      {/* HD Popup Image */}
      <div id="popup" className="popup" onClick={closePopup}>
        {/* <img id="popup-img" src="" alt="HD View" /> */}
      </div>

      {/* AI Chatbox (optional) */}
      <script
        src="https://widget.cxgenie.ai/widget.js"
        data-aid="bac054ad-1035-4a6e-94af-dfe12376fb0c"
        data-lang="en"
      ></script>
    </div>
  )
}

export default Materials
