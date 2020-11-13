function gameLogic() {
  // Переменные
  const gameContainer = document.querySelector(".game-container");
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
    let colors = ["purple", "green", "yellow", "red", "gray"];
    color = colors[Math.floor(Math.random() * 5)];
    return color;
  }
  // Удаление элементов
  function removeCube(cubes) {
    cubes.map((elem) => {
      pointsCount = 0;
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.remove();
        gameResults(pointsCount++);
      });
    });
  }
  addCubes();
  removeCube(cubesArray);
}

gameLogic();
// Логика контрольной панели
// Таймер
// ////////////////////////////////////////КОД ОШИБКИ//////////////////////////////
const gameBlock = document.querySelector(".game-block");

function initCountdown() {
  // Перезапуск игры
  function event_click_cancel(event) {
    pause();
    time = [0, 0];
    print();
    location.reload();
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
    interval = setInterval(count, 1000);
  }
  function pause() {
    clearInterval(interval);
    interval = null;
  }
  function print() {
    let [minutes, seconds] = time;
    if (seconds == 0) {
      clearInterval(interval);
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

  const table = document.querySelector(".timer");
  const toggleElement = document.querySelector(".start");
  const cancelElement = document.querySelector(".new-game");
  let interval = null;
  let time = [01, 00];

  // События
  toggleElement.addEventListener("click", event_click_startpause);

  cancelElement.addEventListener("click", event_click_cancel);
}
initCountdown();
///////////////////////////////////////////////////////////////////////////////////////////////
// Вывод результатов
function gameResults(count) {
  let points = document.querySelector(".points");
  points.textContent = count;
}
