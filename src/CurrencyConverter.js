import React, { useState, useEffect, } from 'react'
import Chart from 'chart.js/auto';

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
        chart();
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
    const [chartLabels, setChartLabels] = useState([]);
    const [chartRate, setChartRate] = useState([]);
    const [chartLabel, setChartLabel] = useState([]);
    const [chartData, setChartData] = useState([]);
    


    const chart = () => {
        if(fromCurrency !== undefined && toCurrency !== undefined) {
            let endDate = new Date().toISOString().split('T')[0];
            let startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
            fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`)
            .then(res => res.json())
            .then(data => {
                setChartLabels([...Object.keys(data.rates)]);
                setChartRate([...Object.values(data.rates).map(rate => rate[toCurrency])]);
                setChartLabel(`${fromCurrency}/${toCurrency}`);
                setChartData({
                    type: 'line',
                    data: {
                        labels: chartLabels,
                        datasets: [{
                            label: chartLabel,
                            data: chartRate,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            })
            .catch(err => {
                console.log(err);
              });
        }
    }

    const myChart = React.useRef();
    useEffect(() => {
        chart();
        const ctx = myChart.getContext('2d');
        let myChart = new Chart(ctx, chartData);
        if (typeof myChart !== 'undefined') {
            myChart.destroy();
        }
        console.log(myChart);
    }, [fromCurrency, toCurrency]);


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
        <canvas ref={node => myChart.current = node} width={'310'} height={'310'} />
    </div>
  )
}
