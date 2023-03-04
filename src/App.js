import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import InventoryPage from './ui/pages/InventoryPage';
import WorkInProgressPage from './ui/pages/WorkInProgressPage';
import OrdersPage from 'ui/pages/OrdersPage';
import NotFoundPage from 'ui/pages/NoFoundPage';
import SellPage from 'ui/pages/SellPage';

// https://randomuser.me/api/

export default () => { 
  return (
    <Routes>
      <Route path="/" element={<SellPage />}></Route>
      <Route path="/inventory" element={<InventoryPage />}></Route>
      <Route path="/orders" element={<OrdersPage />}></Route>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}
