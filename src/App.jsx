//aplicar rutas route
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import AppLayout from './assets/layout/AppLayout.jsx';
import FichaClinicaPage from './assets/ficha-clinica/page/FichaClinica.jsx';
import ListFichaClinica from './assets/ficha-clinica/page/ListFichaClinica.jsx';
import LoginPage from './assets/Login/LoginPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>  
        <Route element={<AppLayout />}>
        <Route path="/fichas" element={<ListFichaClinica />} />
        <Route path="/fichas/nueva" element={<FichaClinicaPage />} />
      </Route>
      <Route path="/" element={<LoginPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;