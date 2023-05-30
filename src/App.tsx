import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Provincias from './components/Provincias';
import DetalleProvincia from './components/DetalleProvincia';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/provincias' element={<Provincias />} />
          <Route path="/provincias/:id" element={<DetalleProvincia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
