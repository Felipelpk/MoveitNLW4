import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';


interface Challenge {
   type:  'body' | 'eye';
   description: string; 
   amount: number;
}
interface ChallengeContextData {
   level: number; 
   levelUp: () => void;
   currentExperience: number;
   challengesCompleted: number; 
   startNewChallenge: () => void;
   activeChallenge: Challenge;
   resetChallenge: () => void;
   xpToNextlevel: number;
   completeChallenge: () => void;
}

interface ChallengesProviderProps {
   children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperiecie] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  function levelUp() {
    setLevel(level + 1);
  }


  useEffect(() => {
     Notification.requestPermission();
  }, [])

  const [activeChallenge, setActiveChallenge] = useState(null);

  function startNewChallenge(){
     const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
     const challenge = challenges[randomChallengeIndex];
     setActiveChallenge(challenge);

     new Audio('/notification.mp3').play();

     if (Notification.permission === 'granted') {
        new Notification('Novo Desafio!', {
           body: `Valendo ${challenge.amount} xp!`
        })
     }
  }

  function resetChallenge() {
     setActiveChallenge(null);
  }
  
  function completeChallenge () {

   if (!activeChallenge) {
      return;
   }

   const { amount } = activeChallenge;

   let finalExperience = currentExperience + amount;
   if (finalExperience >= xpToNextlevel) {
      finalExperience = finalExperience - xpToNextlevel;
      levelUp();
   }

   setCurrentExperiecie(finalExperience);
   setActiveChallenge(null);
   setChallengesCompleted(challengesCompleted+1);
  }

  const xpToNextlevel = Math.pow((level + 1) * 4, 2)

   return (
      <ChallengesContext.Provider value={{ level, 
      levelUp, 
      currentExperience, 
      challengesCompleted, 
      startNewChallenge, 
      activeChallenge,
      resetChallenge,
      xpToNextlevel,
      completeChallenge
       }}>
         {children}
      </ChallengesContext.Provider>
   );
}

// 46:37