import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { NAV_CATEGORIES } from '../data/navigationData'

function Menu_options() {
    const section = useParams()['section'] || 'design';
    const [params] = useSearchParams();
    const category = params.get("category") || "design";
    const subCategory = params.get("type") || null;
    console.log(section, category, subCategory, NAV_CATEGORIES);
    let items = NAV_CATEGORIES[section][category] || [];
    console.log(section, category, subCategory, items);
    if (subCategory){
        items = items.filter(item => item.key === subCategory)[0]?.options || [];
    }
    return (
      <>
        <div className='content-2'>
            <h2>Menu Options for {section}</h2>
            <ul className='wrapper'>
                {items.map(item => (
                    <li key={item.key} className='item'>{item.label}</li>
                ))}
            </ul>
        </div>
      </>
    );
}

export default Menu_options
