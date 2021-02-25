import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';


export function ExperienceBar() {

    const { currentExperience, xpToNextlevel } = useContext(ChallengesContext);
    const porcentToNextlevel = Math.round((currentExperience * 100) / xpToNextlevel);

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${porcentToNextlevel}%` }} />

                <span className={styles.currentExperience} style={{left: `${porcentToNextlevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{xpToNextlevel} xp</span>
        </header>
    )
}