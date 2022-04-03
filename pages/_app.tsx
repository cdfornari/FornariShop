import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeContextProvider } from '../context/theme/ThemeContextProvider';
import '../styles/globals.css'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeContextProvider>
  )
}

export default MyApp
