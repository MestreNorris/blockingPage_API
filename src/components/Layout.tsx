import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className='navbar'>
        <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="/database/blacklist">BLACKLIST</a></li>
          <li><a href="/database/whitelist">WHITELIST</a></li>
          <li><a href="/database/metric">METRIC</a></li>
          <li><a href="/api/blocking_page">API</a></li>
        </ul>
      </nav>
    </header>
    {children}
    <footer className='footer'>
      <span>Copyright © 2021. All rights reserved BlockingPage.</span>
    </footer>
  </div>
)

export default Layout
