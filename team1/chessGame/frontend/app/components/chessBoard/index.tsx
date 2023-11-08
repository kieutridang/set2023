'use client'
import { useState, useEffect } from 'react';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, config } from "@fortawesome/fontawesome-svg-core";
import { faChessPawn, faChessRook, faChessKnight, faChessBishop, faChessQueen, faChessKing, faChessBoard } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

import styles from './styles.module.css';




const pieceIcons: { [key: string]: IconDefinition } = {
    'pawn-black': faChessPawn,
    'rook-black': faChessRook,
    'knight-black': faChessKnight,
    'bishop-black': faChessBishop,
    'queen-black': faChessQueen,
    'king-black': faChessKing,
    'pawn-white': faChessPawn,
    'rook-white': faChessRook,
    'knight-white': faChessKnight,
    'bishop-white': faChessBishop,
    'queen-white': faChessQueen,
    'king-white': faChessKing,
};

function ChessBoard() {
    const [board, setBoard] = useState([
        "rook-black", "knight-black", "bishop-black", "queen-black", "king-black", "bishop-black", "knight-black", "rook-black",
        "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black",
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white",
        "rook-white", "knight-white", "bishop-white", "queen-white", "king-white", "bishop-white", "knight-white", "rook-white"
    ]);

    ///board thay doi thi render lai code:


    return (
        <div className={styles.chessBoard}>
            {board.map((piece, i) => (
                <div key={i} className={styles.block} data-order={i}>
                    {piece?.includes("white") && <FontAwesomeIcon icon={pieceIcons[piece]} className={`${styles.pieces} ${styles.whitePieces}`} />}
                    {piece?.includes("black") && <FontAwesomeIcon icon={pieceIcons[piece]} className={`${styles.pieces} ${styles.blackPieces}`} />}
                    {(i + 1) % 8 === 0 && (
                        <p className={`${styles.orderBlockWidth} ${((9 - Math.floor((i + 1) / 8)) % 2 === 0) ? `${styles.orderBlockWidthEven}` : `${styles.orderBlockWidthOdd}`}`}>
                            {9 - Math.floor((i + 1) / 8)}
                        </p>
                    )}
                    {(i + 1) > 56 && (
                        <p className={`${styles.orderBlockHeight} ${((i + 1) % 2 === 0) ? `${styles.orderBlockHeightOdd}` : `${styles.orderBlockHeightEven}`}`}>
                            {String.fromCharCode(97 + i % 8)}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ChessBoard;