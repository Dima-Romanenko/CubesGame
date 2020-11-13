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
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.remove();
      });
    });
  }
  addCubes();
  removeCube(cubesArray);
}

gameLogic();
// Логика контрольной панели
const gameBlock = document.querySelector(".game-block");
var start = document.querySelector(".start");
var pause = document.querySelector(".pause");
var newGame = document.querySelector(".new-game");
let timer = document.querySelector(".timer");
// timer

function startTimer() {
  let min = "01";
  let sec = "00";
  timer.textContent = `${min}:${sec}`;

  let s = 60;
  setInterval(() => {
    if (s > 0) {
      s--;
      min = "00";
      timer.textContent = `${min}:${s}`;
      if (s < 10) timer.textContent = `${min}:0${s}`;
    } else if (s === 0) {
      timer.textContent = `${min}:00`;
      clearInterval();
    }
  }, 1000);
}
// Events

start.addEventListener("click", () => {
  gameBlock.classList.remove("block");
  if (!start.hasAttribute("disable")) {
    start.setAttribute("disabled", "disabled");
    pause.removeAttribute("disabled");
    startTimer();
  }
  pause.removeAttribute("disable");
});
pause.addEventListener("click", () => {
  if (start.hasAttribute("disabled")) {
    pause.setAttribute("disabled", "disabled");
    start.removeAttribute("disabled");
  }

  gameBlock.classList.add("block");
});
