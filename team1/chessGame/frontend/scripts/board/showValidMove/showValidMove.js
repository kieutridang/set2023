function showValidateMove(piece) {
  //remove valid-move and current-position
  const blocks = document.querySelectorAll(".chessboard__block.valid-move");
  blocks.forEach((block) => block.classList.remove("valid-move"));

  const currentPositionBlocks = document.querySelectorAll(
    ".chessboard__block.current-position"
  );
  currentPositionBlocks.forEach((block) =>
    block.classList.remove("current-position")
  );

  //remove pick
  const pick = document.querySelectorAll(".pieces.pick");
  pick.forEach((pick) => pick.classList.remove("pick"));

  //handle các trường hợp đặc biệt

  //pawn
  if (piece.classList.contains("fa-chess-pawn")) {
    handlePawn(piece);
  }

  //knight
  if (piece.classList.contains("fa-chess-knight")) {
    handleKnight(piece);
  }
  //rook
  if (piece.classList.contains("fa-chess-rook")) {
    handleRook(piece);
  }

  //bishop
  if (piece.classList.contains("fa-chess-bishop")) {
    handleBishop(piece);
  }

  //queen
  if (piece.classList.contains("fa-chess-queen")) {
    handleQueen(piece);
  }

  //king
  if (piece.classList.contains("fa-chess-king")) {
    handleKing(piece);
  }
}
