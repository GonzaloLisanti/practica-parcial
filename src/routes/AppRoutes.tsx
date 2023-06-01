import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import DetalleProvincia from '../components/DetalleProvincia';
import Provincias from '../components/Provincias';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/provincias" element={<Provincias />} />
      <Route path="/provincias/:id" element={<DetalleProvincia />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;