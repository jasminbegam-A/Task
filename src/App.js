import React from 'react';
import {  Route, Routes, Link } from 'react-router-dom';
import CardView from './components/CardView';
import TableView from './components/TableView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   
      <div className="container mx-auto p-4">
        <ToastContainer />
        <nav className="mb-4">
          <Link to="/cards" className="mr-4"><button className="bg-blue-500 text-white p-2 rounded">Card View</button></Link>
          <Link to="/table"><button className="bg-blue-500 text-white p-2 rounded">Table View</button></Link>
        </nav>
        <Routes>
          <Route path="/cards" element={<CardView />} />
          <Route path="/table" element={<TableView />} />
        </Routes>
      </div>
    
  );
}

export default App;
