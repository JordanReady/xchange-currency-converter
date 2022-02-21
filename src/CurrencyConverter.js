import React from 'react'

export default function CurrencyConverter() {
  return (
    <div className='container wrapper'>
        <h1>Currency Converter</h1>
        <form action='#'>
            <div className='amount'>
                <p>Enter Amount</p>
                <input type={'text'}></input>
            </div>
            <div className='drop-list'>
                <div className='from'>
                    <p>From</p>
                    <div className='select-box'>
                        <select>
                            <option value={'USD'}>USD</option>
                            <option value={'NPR'}>NPR</option>
                            <option value={'INR'}>INR</option>
                            <option value={'PKR'}>PKR</option>
                            <option value={'MAD'}>MAD</option>
                        </select>
                    </div>
                </div>
                <div className='icon'>.</div>
                <div className='from'>
                    <p>To</p>
                    <div className='select-box'>
                        <select>
                            <option value={'NPR'}>NPR</option>
                            <option value={'USD'}>USD</option>
                            <option value={'INR'}>INR</option>
                            <option value={'PKR'}>PKR</option>
                            <option value={'MAD'}>MAD</option>
                        </select>
                    </div>
                </div>
            </div>
            <button className='btn'>Find Exhange Rate</button>
            <div className='exchange-rate'>X currency = Y currency</div>
        </form>
    </div>
  )
}
