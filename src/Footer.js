import React from 'react'

export default function Footer() {
  return (
    <div className='footer-container'>
      <h5 className='pt-3'>If you want to see more, check out my socials!</h5>
      <div className='pb-2'>
        <div className='m-3 social'> <a className='social-link' href='https://github.com/JordanReady/xchange-currency-converter' target={'_blank'}>GitHub</a></div>
        <div className='m-3 social2'> <a className='social-link' href='https://hungry-euler-0a8a98.netlify.app/' target={'_blank'}>Portfolio</a></div>
      </div>
    </div>
  )
}

