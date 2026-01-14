import React from 'react'
import DiningRoom from '../assets/interior-photos/dining-room.png'
import KidsRoom from '../assets/interior-photos/kids-room.png'

function ProfileCard({
    userImg = KidsRoom,
    bgImg = DiningRoom,
    name = "John Doe",
    role = "Homeowner",
    desc = `"Urban Grih transformed my living space into a modern masterpiece. Their attention to detail and innovative designs exceeded my expectations. Highly recommend!"`
}) {
return (
    <div className='profile-card'>
        <div className='profile-card-image'>
            <img src={bgImg} alt="" />
        </div>
        <div className='profile-card-data'>
            <div className='profile-card-profile'>
                <img src={userImg} alt="" />
            </div>
            <div className="profile-card-detail">
                <h3>{name}</h3>
                <p>{role}</p>
            </div>
            <div className="profile-card-desc">
                <p>{desc}</p>
            </div>
        </div>
    </div>
)
}

export default ProfileCard
