function isValidMove(validX, validY, isBlack) {
  if (validX < 0 || validX >= 8 || validY < 0 || validY >= 8) return false;

  if (isBlack) {
    if (
      board[validX][validY] === null ||
      board[validX][validY].includes("white")
    ) {
      return true;
    }
    return false;
  } else {
    if (
      board[validX][validY] === null ||
      board[validX][validY].includes("black")
    ) {
      return true;
    }
    return false;
  }
}
