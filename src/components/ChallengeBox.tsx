import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const {activeChallenge , resetChallenge, completeChallenge} = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return(
    <div className={styles.ChallengeBoxContainer}>

      { activeChallenge ? (
        <div className={styles.ChallengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
              <img src={`icons/${activeChallenge.type}.svg`}/>
              <strong>Novo Desafio</strong>
              <p>{activeChallenge.description}</p>
          </main>

          <footer>
              <button type="button" 
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
              >Falhei
              </button>
              <button type="button" 
              className={styles.challengeSucessButton}
              onClick={handleChallengeSucceeded}
              >Completei
              </button>
          </footer>
        </div>
      ) : (
        <div className={styles.ChallengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio.</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando todos os desafios disponíveis.
          </p>
        </div>
      ) }
    </div>
  )
}