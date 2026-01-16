import React from 'react'
import "./feature_style.css"
import { useParams } from 'react-router-dom'
import { FEATURE_DATA } from '../../data/featureData';

function Feature_options() {
    const feature = useParams()['feature'] || 'living-room';
    let items = FEATURE_DATA[feature] || [];
    console.log(feature, items);
    return (
      <div className='content-2'>
        <h2>Options for {feature}</h2>
        <div className='wrapper'>
            {
                items.images.map((item, index) => {
                    return <div className="item" key={`item-${index}`}>
                        <div className="item-image">
                            <img src={item} alt="" />
                        </div>
                    </div>
                })
            }
        </div>
      </div>
    );
}

export default Feature_options
