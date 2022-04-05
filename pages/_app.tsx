import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { CssBaseline } from '@mui/material'
import { ThemeContextProvider,UIProvider } from '../context';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <ThemeContextProvider>
        <UIProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </UIProvider>
      </ThemeContextProvider>
    </SWRConfig>
  )
}

export default MyApp
