import React, { useState, useEffect } from 'react'


export default function CurrencyRates(props) {

  const {
    currencyOptions
  } = props

  return (
    <div>
      <h1>Currency rates</h1>
      <button onClick={console.log(currencyOptions)}>click me</button>
    </div>
  
  )
}
