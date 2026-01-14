import React from 'react'
import "./expert_style.css"
import { useParams, useSearchParams } from 'react-router-dom'
import { NAV_CATEGORIES } from '../../data/navigationData.jsx'
import ProfileCard from '../../components/ProfileCard.jsx'

function Experts_options() {
    const section = useParams()['section'] || 'design';
    const [params] = useSearchParams();
    const category = params.get("category") || "design";
    const subCategory = params.get("type") || null;
    console.log(section, category, subCategory);
    let items = NAV_CATEGORIES[section][category] || [];
    console.log(section, category, subCategory, items);
    if (subCategory){
        items = items.filter(item => item.key === subCategory)[0]?.options || [];
    }
    console.log(section, category, subCategory, items);
    return (
      <div className='expert-option'>
        <h2>Options for {section}</h2>
        <div className='expert-option-container'>
            {
                items.map(item => (
                    <ProfileCard
                        key={item.key}
                        bgImg={item.img}
                        name={item.label}
                    />
                ))
            }
        </div>
      </div>
    );
}

export default Experts_options
