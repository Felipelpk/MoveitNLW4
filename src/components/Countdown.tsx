import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false);
    const [hasFineshed, setHasIsFineshed] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);

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
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFineshed ? (
                <button 
                disabled
                className={styles.countdownButton}
                >
                Ciclo finalizado
                </button>
            ) : (
                <>
                { isActive ? (
                    <button 
                    type="button"
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                    >
                    Abondonar ciclo
                    </button>
                ) : (
                    <button 
                    type="button"
                    className={styles.countdownButton}
                    onClick={startCountdown}
                    >
                    Iniciar um ciclo
                    </button>
                ) }
                </>
            )}
        </div>
    );
}
