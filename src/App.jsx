//aplicar rutas route
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import FichaClinicaPage from './assets/ficha-clinica/page/FichaClinica.jsx';
import LoginPage from './assets/Login/LoginPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ficha_clinica" element={<FichaClinicaPage />} />
        <Route path="/" element={<LoginPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;