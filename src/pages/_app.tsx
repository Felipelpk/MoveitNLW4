import '../styles/global.css'

import { ChallengesProvider } from '../context/ChallengeContext'
import { CountdownProvider } from '../context/CountdownContext'

function MyApp({ Component, pageProps }) {
  return (

      <ChallengesProvider>
        <CountdownProvider>
        <Component {...pageProps} />
        </CountdownProvider>
      </ChallengesProvider>

    )
}

export default MyApp
