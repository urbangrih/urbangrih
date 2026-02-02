import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BlankLayout from "./components/BlankLayout.jsx";
import MainLayout from "./components/MainLayout.jsx";

import Home from './pages/Home';
import SectionRouter from './components/SectionRouter';
import About from './pages/About';
import Contact from './pages/Contact';
import Team from './pages/Team';
import FlatsFloorPlans from './pages/Flats';
import VillasFloorPlans from './pages/Villas';
import Login from './pages/Login';
import Register from './pages/Register';
import FeatureRouter from './components/FeatureRouter';

import Project from './pages/projectCanvas/Project.jsx';



function App() {  
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
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
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/projects" element={<Project />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
