function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
stopBtn.setAttribute('disabled', 'true');
let intervalId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'true');
}
