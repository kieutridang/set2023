//set time here
let blackTime = 1000;
let whiteTime = 1000;

let blackInterval = null;
let whiteInterval = null;

function countTimeBlack() {
  let blackInterval = setInterval(function () {
    blackTime--;
    blackTimeStamp.innerHTML = blackTime;
  }, 1000);
  return blackInterval;
}

function countTimeWhite() {
  let whiteInterval = setInterval(function () {
    whiteTime--;
    whiteTimeStamp.innerHTML = whiteTime;
  }, 1000);
  return whiteInterval;
}

function stopCountTime(interval) {
  clearInterval(interval);
}
