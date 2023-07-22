// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AllTrainsPage from './pages/AllTrainsPage';
import SingleTrainPage from './pages/SingleTrainPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AllTrainsPage />} />
        <Route path="/train/:trainNumber" element={<SingleTrainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
