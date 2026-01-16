import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
// import Menu_options from './pages/Menu_options';
import SectionRouter from './components/SectionRouter';
// import Design from './pages/Design';
// import Experts from './pages/Experts';
// import Materials from './pages/Materials';
import About from './pages/About';
import Contact from './pages/Contact';
import Team from './pages/Team';
import FlatsFloorPlans from './pages/Flats';
import VillasFloorPlans from './pages/Villas';
import Login from './pages/Login';
import Register from './pages/Register';
import LivingRoomDesigns from './pages/Living_room';
import KitchenDesigns from './pages/Kitchen';
import MasterBedroom from './pages/Master_bedroom';
import DiningRoom from './pages/Dining_room';
import KidsBedroom from './pages/Kids_bedroom';
import Wardrobe from './pages/Wordrobe';
import ScrollToTop from "./ScrollToTop";
import FeatureRouter from './components/FeatureRouter';



function App() {  
  return (
    <div>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:section" element={<SectionRouter />} />
        <Route path="/feature/:feature" element={<FeatureRouter />} />
        <Route path="/villas-floor-plans" element={<VillasFloorPlans/>}/>
        <Route path="/flats-floor-plans" element={<FlatsFloorPlans/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
