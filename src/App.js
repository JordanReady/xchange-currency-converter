import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyConverter from './CurrencyConverter';
import Navbar from './Navbar';
import CurrencyRates from './CurrencyRates';
import Footer from './Footer';


function App() {

  return (
    <>
      <Navbar />
      <CurrencyConverter/>
      <CurrencyRates />
      <Footer />
    </>

  );
}

export default App;
