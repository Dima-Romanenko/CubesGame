"use strict";
function cubesGame() {
  const modal = document.querySelector(".modal");
  const gameBlock = document.querySelector(".game-block");
  const saveResultsBtn = document.querySelector(".save-results");
  const select = document.querySelector("#sound-select");
  const volume = document.querySelector(".volume");
  const cansel = document.querySelector(".cansel-save");
  let modalScore = document.querySelector(".modal-score");
  let userName = document.querySelector(".input-name");
  let resultList = document.querySelector(".result-list");
  let counter = 0;
  let soundOfRemoveCube = "";
  let soundChange = false;
  let mute = false;
  // музыка игры
  let music = new Audio();
  music.src = "./sounds/game1.mp3";

  // звук кнопки
  function buttonSound() {
    let sound = new Audio();
    sound.src = "./sounds/new-game.mp3";
    sound.volume = 0.1;
    sound.play();
  }

  function gameLogic() {
    // Переменные
    const gameContainer = document.querySelector(".game-container");
    let points = document.querySelector(".points");

    let cubesCount = 1500;
    const cubesArray = [];
    // Создание элемента
    function createCube() {
      const div = document.createElement("div");
      div.classList.add("cube");
      let color = generateColor();
      div.style.backgroundColor = color;
      gameContainer.appendChild(div);
      cubesArray.push(div);
    }
    // функция добавляет кубики в поле игры
    function addCubes() {
      for (let i = 0; i < cubesCount; i++) {
        createCube();
      }
    }
    // Функция определяет цвет кубика
    function generateColor() {
      let index = 0;
      let colors = ["purple", "green", "yellow", "red", "gray"];
      for (let i = 0; i < colors.length; i++) {
        index = Math.floor(Math.random() * colors.length);
      }
      let color = colors[index];
      return color;
    }
    // Удаление элементов
    function removeCube(cubes) {
      cubes.forEach((elem) => {
        elem.addEventListener("click", (e) => {
          e.preventDefault();
          if (soundChange && !mute) {
            cubesSound();
          } else if (!soundChange && !mute) {
            cubesDefaultSound();
          }
          removeTransform(e.target, counter);
          setTimeout(() => {
            e.target.remove();
          }, 500);
          gameResults(e.target);
        });
      });
    }
    // Анимация удаления кубика
    function removeTransform(removeElem) {
      removeElem.classList.add("removeCube");
      removeElem.style.transition = "0.8s";
      // sound.play();
    }
    // Функция определяет и передает звук
    select.addEventListener("change", () => {
      soundOfRemoveCube = select.value;
      soundChange = true;
    });
    // Функция создает обькт звука при удалении кубика
    function cubesSound() {
      let sound = new Audio();
      sound.src = soundOfRemoveCube;
      sound.play();
    }
    function cubesDefaultSound() {
      let sound = new Audio();
      sound.src = "./sounds/kick-stomp.wav";
      sound.play();
    }
    // функция переключает звук
    volume.addEventListener("click", () => {
      if (mute) {
        mute = false;
        music.volume = 1.0;
        volume.querySelector(".volume-img").style.color = "#fff";
        buttonSound();
      } else {
        mute = true;
        music.volume = 0.0;
        volume.querySelector(".volume-img").style.color = "#000";
        buttonSound();
      }
    });
    // Функция определяет количество очков

    function gameResults(elem) {
      let count = 0;
      if (elem.style.backgroundColor === "yellow") {
        count = 5;
      } else if (elem.style.backgroundColor === "purple") {
        count = 1;
      } else if (elem.style.backgroundColor === "green") {
        count = 3;
      } else if (elem.style.backgroundColor === "red") {
        count = -5;
      } else if (elem.style.backgroundColor === "gray") {
        count = 0;
      }
      counter += count;
      points.innerHTML = counter;
    }

    addCubes();
    removeCube(cubesArray);
  }

  // Логика панели управления

  // Таймер
  function initCountdown() {
    // Переменные
    const table = document.querySelector(".timer");
    const toggleElement = document.querySelector(".start");
    const cancelElement = document.querySelector(".new-game");
    let interval = null;
    let time = [0o1, 0o0];
    // Перезапуск игры
    function event_click_cancel() {
      buttonSound();
      time = [0o1, 0];
      print();
      setTimeout(() => {
        location.reload();
      }, 500);
    }
    // Старт || Стоп
    function event_click_startpause(event) {
      if (interval === null) {
        start();
        event.target.innerText = "pause";
        gameBlock.classList.remove("block");
      } else {
        pause();
        event.target.innerText = "start";
        gameBlock.classList.add("block");
      }
    }
    function start() {
      pause();
      startPauseSound();
      music.play();
      interval = setInterval(count, 1000);
    }
    function pause() {
      music.pause();
      startPauseSound();
      clearInterval(interval);
      interval = null;
    }
    function print() {
      let [minutes, seconds] = time;
      if (seconds == 0 && minutes == "00") {
        clearInterval(interval);

        gameOver();
      }
      if (seconds < 10) {
        table.innerHTML = `00:0${seconds}`;
      } else {
        table.innerHTML = `00:${seconds}`;
      }
    }
    function count() {
      time[1]--;

      if (time[1] == -1) {
        time[0]--;
        time[1] = 59;
      }

      print();
    }
    // звук старт/пауза
    function startPauseSound() {
      let sound = new Audio();
      sound.src = "./sounds/start-pause.mp3";
      sound.volume = 0.1;
      sound.play();
    }

    // События
    toggleElement.addEventListener("click", event_click_startpause);

    cancelElement.addEventListener("click", event_click_cancel);
  }
  initCountdown();

  // Всплытие модального окна
  function gameOver() {
    modalScore.innerHTML = counter;
    modal.style.display = "block";
    gameBlock.classList.add("block");
    music.pause();
  }
  // отмена сохранения
  cansel.addEventListener("click", () => location.reload());
  // Функция создает обьект с результатом
  saveResultsBtn.addEventListener("click", () => {
    let resultData = {
      name: userName.value,
      score: counter,
    };
    if (resultData.name == null || resultData.name == "") {
      return;
    } else {
      buttonSound();
      saveLocalResults(resultData);
    }
  });
  // Функция сохраняет имя и результат в localStorage
  let resultsArray;
  function saveLocalResults(res) {
    if (localStorage.getItem("resultsArray") === null) {
      resultsArray = [];
    } else {
      resultsArray = JSON.parse(localStorage.getItem("resultsArray"));
    }

    resultsArray.push(res);
    localStorage.setItem("resultsArray", JSON.stringify(resultsArray));
  }
  // Функция выводит данные из localStorage в блок результатов
  function getResultsFromLocal() {
    if (localStorage.getItem("resultsArray") === null) {
      resultsArray = [];
    } else {
      resultsArray = JSON.parse(localStorage.getItem("resultsArray"));
    }
    resultsArray
      .sort((a, b) => {
        return b.score - a.score;
      })
      .forEach((elem, i) => {
        if (i < 7) {
          const div = document.createElement("div");
          div.classList.add("achievements");
          const span = document.createElement("span");
          span.classList.add("user-name");
          span.textContent = elem.name;
          const strong = document.createElement("strong");
          strong.classList.add("achievement");
          strong.textContent = elem.score;
          div.appendChild(span);
          div.appendChild(strong);
          resultList.appendChild(div);
        }
      });
  }
  gameLogic();
  getResultsFromLocal();
}

cubesGame();

// function test(){
//         var audio = document.createElement('audio');
//         audio.setAttribute("autoplay","true");
//         audio.innerHTML = "<source src=\"audio/test.mp3\" type=\"audio/mpeg\">";
//         document.body.appendChild(audio);
//     }
