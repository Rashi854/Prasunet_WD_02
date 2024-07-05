const playButton = document.getElementsByClassName("button-play")[0];
const lapButton = document.getElementsByClassName("button-lap")[0];
const resetButton = document.getElementsByClassName("button-reset")[0];
const clearButton = document.getElementsByClassName("clear-button")[0];
const hour = document.getElementsByClassName("hr")[0];
const minute = document.getElementsByClassName("min")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay=false;
let secCounter=0;
let sec;
let centiSec;
let centiCounter=0;
let min;
let minCounter=0;
let hr;
let hrCounter=0;
let lapItem=0;
let isReset = false;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
  if (!isPlay && !isReset) {
    playButton.innerHTML = 'Pause';
    bg.classList.add("animation-bg");
    hr = setInterval(() => {
      hrCounter++;
      if (hrCounter === 12) {
        hrCounter = 0;
      }
      hour.innerHTML = `${hrCounter} :&nbsp`;
    }, 3600000); 
    min = setInterval(() => {
      minCounter++;
      if (minCounter === 60) {
        minCounter = 0;
      }
      minute.innerHTML = `${minCounter} :&nbsp`;
    }, 60000); 
    sec = setInterval(() => {
      secCounter++;
      if (secCounter === 60) {
        secCounter = 0;
      }
      second.innerHTML = `&nbsp;${secCounter} :`;
    }, 1000);
    centiSec = setInterval(() => {
      centiCounter++;
      if (centiCounter === 100) {
        centiCounter = 0;
      }
      centiSecond.innerHTML = `&nbsp;${centiCounter}`;
    }, 10); 
    isPlay = true;
    isReset=true;
  }
    else{
        playButton.innerHTML = 'Play';
        clearInterval(hr);
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset=false;  
        bg.classList.remove("animation-bg");
    }
    toggleButton();
}

const reset = () => {
  isReset=true;
  play();
  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  hour.innerHTML='0 :';
  minute.innerText = '0 :';
  second.innerHTML = '&nbsp;0 :';
  centiSecond.innerHTML ='&nbsp;0';
  hrCounter = 0;
  minCounter = 0;
  secCounter = 0;
  centiCounter = 0;
  lapItem = 0;
  laps.innerHTML = ''; 
  isReset = false;
}

const lap =()=>{
    const li =document.createElement("li");
    const number =document.createElement("span");
    const timeStamp =document.createElement("span");

    li.setAttribute("class","lap-item");
    number.setAttribute("class","number");
    timeStamp.setAttribute("class","time-stamp");

    number.innerText =`#${++lapItem}`;
    timeStamp.innerHTML = `${hrCounter} : ${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
}

const clearAll = () => {
  laps.innerHTML = '';
  laps.append(clearButton);
  lapItem=0;
}

playButton.addEventListener("click" ,play);
resetButton.addEventListener("click" ,reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener("click",clearAll);
