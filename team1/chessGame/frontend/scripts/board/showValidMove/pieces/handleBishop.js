function handleBishop(piece) {
  const [currentPositionX, currentPositionY] = getCurrentPosition(piece);
  piece.classList.add("pick");

  const moves = [
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  const isBlack = piece.classList.contains("black-pieces") ? true : false;

  logicShowMoves(currentPositionX, currentPositionY, isBlack, moves);
}
