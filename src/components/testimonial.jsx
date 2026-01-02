import React from 'react'
import DiningRoom from '../assets/interior-photos/dining-room.png'
import KidsRoom from '../assets/interior-photos/kids-room.png'

function Testimonial() {
return (
    <div className='testimonial-card'>
        <div className='card-image'>
            <img src={DiningRoom} alt="" />
        </div>
        <div className='card-data'>
            <div className='card-profile'>
                <img src={KidsRoom} alt="" />
            </div>
            <div className="card-detail">
                <h3>John Doe</h3>
                <p>Homeowner</p>
            </div>
            <div className="card-review">
                <p>"Urban Grih transformed my living space into a modern masterpiece. Their attention to detail and innovative designs exceeded my expectations. Highly recommend!"</p>
            </div>
        </div>
    </div>
)
}

export default Testimonial
