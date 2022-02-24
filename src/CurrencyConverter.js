import React, { useState, useEffect } from 'react'

export default function CurrencyConverter(props) {

    const BASE_URL = 'https://altexchangerateapi.herokuapp.com/latest'
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [fromCurrencyAmount, setFromCurrencyAmount] = useState(1);
    const [toCurrencyAmount, setToCurrencyAmount] = useState(0);
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [exchangeRate, setExchangeRate] = useState(); 


    useEffect(() => {
      fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.rates)[0]
          setCurrencyOptions([data.base, ...Object.keys(data.rates)])
          setFromCurrency(data.base)
          setToCurrency(firstCurrency)
          setExchangeRate(data.rates[firstCurrency]);
          console.log(data.rates.BRL);
        })
      }, [])

      useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}?from=${fromCurrency}&to=${toCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))
        }
      }, [fromCurrency, toCurrency])

    const handleSwitch = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    const handleClick = () => {
        console.log(fromCurrency);
        const conversion = fromCurrencyAmount * exchangeRate;
        setToCurrencyAmount(conversion);
    }

    const getAmount = (e) => {
        setFromCurrencyAmount(e.target.value);
        setToCurrencyAmount(0);
    }

    const getFromCurrency = (e) => {
        setFromCurrency(e.target.value);
    } 

    const getToCurrency = (e) => {
        setToCurrency(e.target.value);
    }

  return (
    <div className='container wrapper'>
        <h1>Currency Converter</h1>
        <form action='#'>
            <div className='amount'>
                <p>Enter Amount</p>
                <input type={'text'} onChange={getAmount}></input>
            </div>
            <div className='drop-list'>
                <div className='from'>
                    <p>From</p>
                    <div className='select-box'>
                        <select value={fromCurrency} onChange={getFromCurrency}>
                            {currencyOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className='icon' onClick={handleSwitch}>&#60;-&#62;</button>
                <div className='from'>
                    <p>To</p>
                    <div className='select-box'>
                    <select value={toCurrency} onChange={getToCurrency}>
                            {currencyOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <button className='btn find-button' onClick={handleClick}>Find Exhange Rate</button>
            <div className='exchange-rate'> {fromCurrencyAmount} {fromCurrency} = {toCurrencyAmount} {toCurrency}</div>
        </form>
    </div>
  )
}
