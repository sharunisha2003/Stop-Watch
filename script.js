let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 100);
    }
}

function stop() {
    if (isRunning) {
        isRunning = false;
        elapsedTime = Date.now() - startTime;
        clearInterval(timer);
    }
}

function reset() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    laps = [];
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function update() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}
