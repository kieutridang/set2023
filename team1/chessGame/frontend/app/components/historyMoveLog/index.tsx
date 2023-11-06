import styles from './styles.module.css';


function HistoryMove() {
    return (
        <div className={styles.historyMove}>
            <div className={`${styles.timeWhitePlayer} ${styles.time}`}>
                <h1>00:00</h1>
            </div>
           
            <div className={`${styles.timeBlackPlayer} ${styles.time}`}>
                <h1>00:00</h1>
            </div>
        </div>
    );
}

export default HistoryMove;