import styles from './styles.module.css';
import ChessBoard from "../components/chessBoard";
import HistoryMove from "../components/historyMoveLog";

export default function Page() {
    return (
        <div className={styles.content}>
            <ChessBoard />
            <HistoryMove />
        </div>
    )
  }