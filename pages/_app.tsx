import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CssBaseline } from '@mui/material'
import { AuthProvider, CartProvider, ThemeContextProvider,UIProvider } from '../context';
import '../styles/globals.css'

function MyApp({ Component, pageProps}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PayPalScriptProvider options={{"client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''}}>
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
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
