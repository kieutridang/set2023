function handleKing(piece) {
  const [currentPositionX, currentPositionY] = getCurrentPosition(piece);

  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const isBlack = piece.classList.contains("black-pieces") ? true : false;

  moves.forEach(([dx, dy]) => {
    let validX = currentPositionX + dx;
    let validY = currentPositionY + dy;
    let block = document.querySelector(
      `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
    );
    if (block) {
      if (isValidMove(validX, validY, isBlack)) {
        block.classList.add("valid-move");
      }
    }
  });

  //castling
  if (isBlack) {
    if (board[0][4] === "King-black") {
      if (board[0][5] === null && board[0][6] === null) {
        let block = document.querySelector(
          `.chessboard__block[data-x='0'][data-y='6']`
        );
        block.classList.add("valid-move");
      }

      if (
        board[0][3] === null &&
        board[0][2] === null &&
        board[0][1] === null
      ) {
        let block = document.querySelector(
          `.chessboard__block[data-x='0'][data-y='2']`
        );
        block.classList.add("valid-move");
      }
    }
  } else {
    if (board[7][4] === "King-white") {
      if (board[7][5] === null && board[7][6] === null) {
        const block1 = document.querySelector(
          `.chessboard__block[data-x='7'][data-y='6']`
        );
        block1.classList.add("valid-move");
      }

      if (
        board[7][3] === null &&
        board[7][2] === null &&
        board[7][1] === null
      ) {
        const block2 = document.querySelector(
          `.chessboard__block[data-x='7'][data-y='2']`
        );
        block2.classList.add("valid-move");
      }
    }
  }
}
