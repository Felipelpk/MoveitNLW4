import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

import { LevelUpModal } from '../components/levelUpModal';


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
   closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
   children: ReactNode; 
   level: number;
   currentExperience: number;
   challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperiecie] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const xpToNextlevel = Math.pow((level + 1) * 4, 2)

  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  useEffect(() => {
      Cookies.set('level', String(level));
      Cookies.set('currentExperience', String(currentExperience));
      Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])


  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function closeLevelUpModal () {
     setIsLevelModalOpen(false);
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

   return (
      <ChallengesContext.Provider value={{ level, 
      levelUp, 
      currentExperience, 
      challengesCompleted, 
      startNewChallenge, 
      activeChallenge,
      resetChallenge,
      xpToNextlevel,
      completeChallenge,
      closeLevelUpModal
       }}
       >
         {children}
         {isLevelModalOpen && <LevelUpModal />}
      </ChallengesContext.Provider>
   )
}

// 46:37