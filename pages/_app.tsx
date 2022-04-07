import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { CssBaseline } from '@mui/material'
import { CartProvider, ThemeContextProvider,UIProvider } from '../context';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <CartProvider>
        <ThemeContextProvider>
          <UIProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </UIProvider>
        </ThemeContextProvider>
      </CartProvider>
    </SWRConfig>
  )
}

export default MyApp
