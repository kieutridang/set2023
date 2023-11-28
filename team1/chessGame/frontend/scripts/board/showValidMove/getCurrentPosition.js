function getCurrentPosition(piece) {
  const currentPositionX = parseInt(piece.parentElement.dataset.x);
  const currentPositionY = parseInt(piece.parentElement.dataset.y);
  piece.classList.add("pick");
  return [currentPositionX, currentPositionY];
}
