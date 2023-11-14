function renderChessBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const index = i * 8 + j;
            const piece = board[i][j];

            generateBlock(i, j, piece);
        }
    }
}