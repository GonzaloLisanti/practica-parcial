import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import AgendaContacto from '../components/AgendaContacto';
import TablaAgenda from '../components/TablaAgenda';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contactos" element={<AgendaContacto />} />
      <Route path="/admin/contactos" element={<TablaAgenda />} />
      {/* <Route path="/provincias/:id" element={<DetalleProvincia />} /> */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;