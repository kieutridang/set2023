function logicShowMoves(currentPositionX, currentPositionY, isBlack, moves) {
  moves.forEach(([dx, dy]) => {
    let validX = currentPositionX + dx;
    let validY = currentPositionY + dy;
    let block = document.querySelector(
      `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
    );
    while (block) {
      if (isBlack) {
        if (board[validX][validY] === null) {
          block.classList.add("valid-move");
        } else if (board[validX][validY].includes("white")) {
          block.classList.add("valid-move");
          break;
        } else {
          break;
        }
      } else {
        if (board[validX][validY] === null) {
          block.classList.add("valid-move");
        } else if (board[validX][validY].includes("black")) {
          block.classList.add("valid-move");
          break;
        } else {
          break;
        }
      }

      validX += dx;
      validY += dy;
      block = document.querySelector(
        `.chessboard__block[data-x='${validX}'][data-y='${validY}']`
      );
    }
  });
}
