import {  createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengeContext';

interface CountdownContextData{
  minutes: number;
  seconds: number;
  hasFineshed: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }) {
  const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false);
    const [hasFineshed, setHasIsFineshed] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
      setIsActive(true);
  }

  function resetCountdown(){
      clearTimeout(countdownTimeout);
      setIsActive(false);
      setTime(0.05 * 60);
      setHasIsFineshed(false);

  }

  useEffect(() => {
      if (isActive && time > 0) {
          countdownTimeout = setTimeout(() => {
              setTime(time - 1);
          }, 1000)
      }
      else if (isActive && time === 0) {
          setHasIsFineshed(true);
          setIsActive(false);
          startNewChallenge();
      }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFineshed,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}