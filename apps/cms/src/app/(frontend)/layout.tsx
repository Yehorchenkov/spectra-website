import React from 'react'
import './styles.css'
// import Icon from '@/assets/favicon.svg'

export const metadata = {
  description: 'SPECTRA CE EU CMS admin panel',
  title: 'SPECTRA CE EU CMS',
  icons: {
    icon: [
      { url: '/assets/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
