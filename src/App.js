import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryPage from './ui/pages/InventoryPage';
import WorkInProgressPage from './ui/pages/WorkInProgressPage';
import OrdersPage from 'ui/pages/OrdersPage';
import NotFoundPage from 'ui/pages/NoFoundPage';
import SellPage from 'ui/pages/SellPage';

// https://randomuser.me/api/

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SellPage />}></Route>
        <Route path="/i" element={<InventoryPage />}></Route>
        <Route path="/o" element={<OrdersPage />}></Route>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
}

export default App;