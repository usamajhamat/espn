import './globals.css'

import React from 'react'

const RootLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <html lang='en' className='antialiased'>
      <body className='mt-60'>{children}</body>
    </html>
  )
}

export default RootLayout