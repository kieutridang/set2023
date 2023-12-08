function promotePawn(positionX, positionY) {
    if (positionX == 0 || positionX == 7) {
        board[positionX][positionY] = board[positionX][positionY].replace(
            "Pawn",
            "Queen"
        );
    }
}