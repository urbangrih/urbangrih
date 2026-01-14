import React from 'react';
import { useParams } from 'react-router-dom';
import Menu_options from '../pages/Menu_options.jsx';
import Experts_options from '../pages/experts/Experts_options.jsx';

function SectionRouter() {
    const { section } = useParams();
    
    // Render Experts_options for experts section
    if (section === 'experts') {
        return <Experts_options />;
    }
    
    // Render Menu_options for design and materials sections
    return <Menu_options />;
}

export default SectionRouter;