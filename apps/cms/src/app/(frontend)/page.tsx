import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <img
          src="/assets/logo_Spectra.svg"
          alt="Spectra CE EU Logo"
          height={100}
          width={250}
        />
        {!user && <h2>Welcome to SPECTRA CE EU website.</h2>}
        {user && <h2>Welcome back, {user.email}</h2>}
        <div className="links">
          <a
            className="admin"
            // href={payloadConfig.routes.admin}
            href="https://spectra-perseus.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            Visit Our Website
          </a>
        </div>
      </div>
      <div className="footer">
      </div>
    </div>
  )
}
