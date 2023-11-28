function handleKnight(piece) {
  const [currentPositionX, currentPositionY] = getCurrentPosition(piece);
  piece.classList.add("pick");

  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
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
}
