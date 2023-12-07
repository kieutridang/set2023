function countTimeBlack(time) {
  let blackInterval = setInterval(function () {
    time--;
    blackTimeStamp.innerHTML = time;
  }, 1000);
  return blackInterval;
}

function countTimeWhite(time) {
  let whiteInterval = setInterval(function () {
    time--;
    whiteTimeStamp.innerHTML = time;
  }, 1000);
  return whiteInterval;
}

function stopTimeBlack(blackInterval) {
  clearInterval(blackInterval);
}

function stopTimeWhite(whiteInterval) {
  clearInterval(whiteInterval);
}
