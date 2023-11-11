const historyMove = document.createElement('div');
historyMove.className = 'history-move';
const blackPlayerTimeStamp = document.createElement('div');
blackPlayerTimeStamp.className = 'history-move__time black-player';
const blackTimeStamp = document.createElement('h1');
blackTimeStamp.innerHTML = '00:00';
blackPlayerTimeStamp.appendChild(blackTimeStamp);
const whitePlayerTimeStamp = document.createElement('div');
whitePlayerTimeStamp.className = 'history-move__time white-player';
const whiteTimeStamp = document.createElement('h1');
const logContent = document.createElement('div');
logContent.className = 'history-move__log-content';
whiteTimeStamp.innerHTML = '00:00';
whitePlayerTimeStamp.appendChild(whiteTimeStamp);
historyMove.appendChild(blackPlayerTimeStamp);
historyMove.appendChild(logContent);
historyMove.appendChild(whitePlayerTimeStamp);

// history move
content.appendChild(historyMove);

function showHistoryMove(currentPositionX, currentPositionY, positionX, positionY) {
    log = document.createElement('p');
    log.innerHTML = currentPositionX + currentPositionY + '->' + positionX + positionY;
    logContent.appendChild(log);
}