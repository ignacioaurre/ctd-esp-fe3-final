import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "dh-marvel/styles/material-theme";
import ContextProvider from 'context';

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
    <ContextProvider>
    <CssBaseline />
      <Component {...pageProps} />
    <style jsx global>{`
              /* Other global styles such as 'html, body' etc... */
              
              #__next {
                height: 100%;
              }
              `}</style>
    </ContextProvider>
  </ThemeProvider>
}

export default MyApp
