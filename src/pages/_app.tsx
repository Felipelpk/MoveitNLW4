import '../styles/global.css'

import { CountdownProvider } from '../context/CountdownContext'

function MyApp({ Component, pageProps }) {
  return (
        <Component {...pageProps} />
    )
}

export default MyApp
