const historyMove = document.createElement("div");
historyMove.className = "history-move";
const blackPlayerTimeStamp = document.createElement("div");
blackPlayerTimeStamp.className = "history-move__time black-player";
const blackTimeStamp = document.createElement("h1");
blackTimeStamp.innerHTML = "00:00";
blackPlayerTimeStamp.appendChild(blackTimeStamp);
const whitePlayerTimeStamp = document.createElement("div");
whitePlayerTimeStamp.className = "history-move__time white-player";
const whiteTimeStamp = document.createElement("h1");
const logContent = document.createElement("div");
logContent.className = "history-move__log-content";
whiteTimeStamp.innerHTML = "00:00";
whitePlayerTimeStamp.appendChild(whiteTimeStamp);
historyMove.appendChild(blackPlayerTimeStamp);
historyMove.appendChild(logContent);
historyMove.appendChild(whitePlayerTimeStamp);

// history move
content.appendChild(historyMove);

function showHistoryMove(
  currentPositionX,
  currentPositionY,
  positionX,
  positionY
) {
  const coordinate = [
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
  ];

  log = document.createElement("p");
  log.innerHTML =
    board[positionX][positionY] +
    ": " +
    coordinate[currentPositionX][currentPositionY] +
    "->" +
    coordinate[positionX][positionY];
  logContent.appendChild(log);
}
