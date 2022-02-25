import React from 'react';
import './App.css';
import CurrencyConverter from './CurrencyConverter';
import Navbar from './Navbar';
import CurrencyRates from './CurrencyRates';
import Footer from './Footer';


function App() {

  return (
    <>
      <Navbar />
      <div className='row'>
        <div className='col-12 col-md-6'><CurrencyConverter/></div>
        <div className='col-12 col-md-6'><CurrencyRates /></div>
      </div>
      
      <Footer />
    </>

  );
}

export default App;
