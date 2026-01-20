import React from 'react'
import DiningRoom from '../assets/interior-photos/dining-room.png'
import KidsRoom from '../assets/interior-photos/kids-room.png'

function ProfileCard({
    userImg = KidsRoom,
    bgImg = DiningRoom,
    name = "Divyansh",
    role = "Homeowner",
    desc = `"Urban Grih is an amazing home map design and interior company. They designed my home map, and the whole experience was super smooth and affordable. The management was always on top of things, but what I loved the most was their communication they were available whenever I needed them and made changes exactly as I requested, without any hassle.

A special thanks to Mr. Ujjwal kulshrestha for the wonderful home map design. I had asked for a home map within 1100 sq. ft. including a garden, which honestly felt impossible  getting both a luxurious home and a garden in that space. But his skills made it completely possible.

Really happy with the final result and would definitely recommend Urban Grih to anyone looking for smart, well-planned home designs."`
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
