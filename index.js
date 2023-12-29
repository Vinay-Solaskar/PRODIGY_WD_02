const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lapclear")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("seconds")[0];
const centiSecond = document.getElementsByClassName("mseconds")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outercircle")[0];

let isPlay = false;
let secCounter = 0;
let minCounter = 0;
let centiCounter = 0;
let isReset = false;

let minInterval;
let secInterval;
let centiInterval;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = 'Pause'
        bg.classList.add("animation-bg");
        minInterval = setInterval(() => {
            minute.textContent = `${++minCounter} : `;
        }, 60 * 1000);
        secInterval = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.textContent = `${++secCounter} : `;
        }, 1000);
        centiInterval = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.textContent = `${++centiCounter} `;
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(minInterval);
        clearInterval(secInterval);
        clearInterval(centiInterval);
        isPlay = false;
        isReset = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
};

const reset = () => {
    clearInterval(minInterval);
    clearInterval(secInterval);
    clearInterval(centiInterval);
    isPlay = false;
    isReset = false;
    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;
    minute.textContent = '0 : ';
    second.textContent = '0 : ';
    centiSecond.textContent = '0 ';
    playButton.innerHTML = 'Play';
    toggleButton();
};

const clearAllLaps = () => {
    
    laps.innerHTML = '';
    laps.append(clearButton);
    clearButton.classList.add("hidden");
};

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "numbers");
    timeStamp.setAttribute("class", "time-stamp");

    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;
    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAllLaps);


