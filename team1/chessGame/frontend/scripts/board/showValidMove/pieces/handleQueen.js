function handleQueen(piece) {
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

  logicShowMoves(currentPositionX, currentPositionY, isBlack, moves);
}
