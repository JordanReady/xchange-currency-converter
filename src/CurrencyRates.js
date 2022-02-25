import React, { useState, useEffect } from 'react'


export default function CurrencyRates(props) {
  const BASE_URL = 'https://altexchangerateapi.herokuapp.com/latest'
  const [baseCurrency, setBaseCurrency] = useState();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencyRates, setCurrencyRates] = useState([]);

  const handleChange = (e) => {
    setBaseCurrency(e.target.value);
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setCurrencyRates([...Object.values(data.rates)])
      })
    }, [])

    useEffect(() => {
      if (baseCurrency != undefined) {
        fetch(`${BASE_URL}?from=${baseCurrency}`)
        .then(res => res.json())
        .then(data => {
          setCurrencyOptions([data.base, ...Object.keys(data.rates)])
          setCurrencyRates([...Object.values(data.rates)])
        })
      }
    }, [baseCurrency])

  return (
    <div className='container live-currency-rates wrapper my-5'>
        <h1>Live Currency Rates</h1>
        <h5 className='header'>Base Currency</h5>
        <select className='base-select' onChange={handleChange}>{currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}</select>
          <div className="row">
            <div className="col">
              <table className='m-auto'>
                <tbody>
                  <tr>
                    <th className='header'>Currency</th>
                  </tr>
                  {currencyOptions.map(option => (<tr className='currency-rate' key={option}><th>{option}</th></tr>))}
                </tbody>
              </table>
            </div>
            <div className="col">
              <table className='m-auto'>
                <tbody>
                  <tr>
                    <th className='header'>Rate</th>
                  </tr>
                    <tr className='currency-rate'>
                      <th>1.0000</th>
                    </tr>
                    {currencyRates.map(option => (<tr className='currency-rate' key={option}><th>{option}</th></tr>))}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  
  )
}
