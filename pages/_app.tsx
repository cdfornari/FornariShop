import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr';
import { CssBaseline } from '@mui/material'
import { AuthProvider, CartProvider, ThemeContextProvider,UIProvider } from '../context';
import '../styles/globals.css'

function MyApp({ Component, pageProps}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
            <ThemeContextProvider>
              <UIProvider>
                <CssBaseline />
                <Component {...pageProps} />
              </UIProvider>
            </ThemeContextProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
