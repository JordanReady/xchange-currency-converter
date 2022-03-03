import React, { useState, useEffect, } from 'react'
import Chart from 'chart.js/auto';

export const checkStatus = (response) => {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
}
export const json = (response) => response.json()

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
        })
      }, [])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}?from=${fromCurrency}&to=${toCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))

            getHistoricalRates(fromCurrency, toCurrency);
        }
    }, [fromCurrency, toCurrency])

    const handleSwitch = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    const handleClick = (e) => {
        e.preventDefault();
        const conversion = (fromCurrencyAmount * exchangeRate).toFixed(2);
        
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


    // Chart.js
    
    let chart = undefined;

    const getHistoricalRates = (base, quote) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${base}&to=${quote}`)
        .then(checkStatus)
        .then(json)
        .then(data => {
            console.log(data)
            if (data.error) {
              throw new Error(data.error);
            }

            const chartLabels = Object.keys(data.rates);
            const chartData = Object.values(data.rates).map(rate => rate[quote]);
            const chartLabel = `${base}/${quote}`;
            buildChart(chartLabels, chartData, chartLabel);
        })
        .catch(error => console.error(error.message));
    }

    const buildChart = (labels, data, label) => {
        console.log('build')
        const chartRef = document.getElementById('myChart');

        if (!chartRef) {
            return
        }

        if (typeof chart !== "undefined") {
          chart.destroy();
        }

        chart = new Chart(chartRef.getContext("2d"), {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: label,
                data,
                fill: false,
                tension: 0,
                fontColor: 'white'
              }
            ]
          },
          options: {
            plugins: {
                legend: {
                  labels: {
                    color: "white", 
                    font: {
                      size: 18 
                    }
                  }
                }
              },
            responsive: true,
            
          }
        })
    }


  return (
    <div className='container wrapper my-5'>
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
        <canvas id='myChart' width={'310'} height={'310'} />
    </div>
  )
}

