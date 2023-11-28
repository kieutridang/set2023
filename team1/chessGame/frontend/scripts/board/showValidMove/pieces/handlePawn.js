function handlePawn(piece) {
  const [currentPositionX, currentPositionY] = getCurrentPosition(piece);
  piece.classList.add("pick");

  const isBlack = piece.classList.contains("black-pieces") ? true : false;

  const direction = isBlack ? 1 : -1;

  for (let dy = -1; dy <= 1; dy += 2) {
    let newX = currentPositionX + direction;
    let newY = currentPositionY + dy;
    if (
      newX >= 0 &&
      newX < 8 &&
      newY >= 0 &&
      newY < 8 &&
      board[newX][newY] != null
    ) {
      const diagonalBlock = document.querySelector(
        `.chessboard__block[data-x='${newX}'][data-y='${newY}']`
      );
      diagonalBlock.classList.add("valid-move");
    }
  }

  let newX = currentPositionX + direction;
  if (newX >= 0 && newX < 8 && board[newX][currentPositionY] === null) {
    const forwardBlock = document.querySelector(
      `.chessboard__block[data-x='${newX}'][data-y='${currentPositionY}']`
    );
    forwardBlock.classList.add("valid-move");
  }

  if (
    (isBlack && currentPositionX === 1) ||
    (!isBlack && currentPositionX === 6)
  ) {
    newX = currentPositionX + 2 * direction;
    if (newX >= 0 && newX < 8 && board[newX][currentPositionY] === null) {
      const doubleForwardBlock = document.querySelector(
        `.chessboard__block[data-x='${newX}'][data-y='${currentPositionY}']`
      );
      doubleForwardBlock.classList.add("valid-move");
    }
  }
}
