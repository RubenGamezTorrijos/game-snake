const gridContainer = document.querySelector('.grid-container');
const score = document.querySelector('#score');
const resetButton = document.querySelector('#reset-button');

const gridSize = 20;
const cellSize = 20;
const snake = [{x: 10, y: 10}];
let food = getRandomFood();
let scoreValue = 0;
let interval;

function getRandomFood() {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  };
}

function render() {
  gridContainer.innerHTML = '';
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (snake.some(segment => segment.x === j && segment.y === i)) {
        cell.classList.add('snake');
      }
      if (food.x === j && food.y === i) {
        cell.classList.add('food');
      }
      gridContainer.appendChild(cell);
    }
  }
}

function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'Up':
      head.y -= 1;
      break;
    case 'Down':
      head.y += 1;
      break;
    case 'Left':
      head.x -= 1;
      break;
    case 'Right':
      head.x += 1;
      break;
  }
  snake.unshift(head);
  if (snake[0].x === food.x && snake[0].y === food.y) {
    food = getRandomFood();
    scoreValue += 10;
    score.innerText = scoreValue;
  } else {
    snake.pop();
  }
  if (
    snake.some((segment, index) => 
      index !== 0 && segment.x === snake[0].x && segment.y === snake[0].y
    ) || 
    snake[0].x < 0 || snake[0].x >= gridSize || snake[0].y < 0 || snake[0].y >= gridSize
  ) {
    clearInterval(interval);
    alert(`¡Fin del juego! Puntos ganados: ${scoreValue}`);
  } else {
    render();
  }
}

let direction = 'Right';

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      direction = 'Up';
      break;
    case 'ArrowDown':
      direction = 'Down';
      break;
    case 'ArrowLeft':
      direction = 'Left';
      break;
    case 'ArrowRight':
      direction = 'Right';
      break;
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(interval);
  scoreValue = 0;
  score.innerText = scoreValue;
  snake.splice(1);
  snake[0] = {x: 10, y: 10};
  food = getRandomFood();
  direction = 'Right';
  interval = setInterval(moveSnake, 100);
});

interval = setInterval(moveSnake, 100);
