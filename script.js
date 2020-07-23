const startBtn = document.getElementById('start-btn');
const startCard = document.getElementById('start-difficulty');
const difficultySelect = document.getElementById('difficulty');

// const gameCard = document.getElementById('game-info');
const randomWord = document.getElementById('random-word');
const textInput = document.getElementById('user-input');

const scoreOnCard = document.getElementById('score');
const timeLeft = document.getElementById('time');

const endGameCard = document.getElementById('endgame-container');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

let time;
let difficultyLevel;
let score;
let gameOver;

function initialiseGame() {
  time = 10;
  score = 0;
  gameOver = false;
  difficultyLevel = determineDifficulty(difficultySelect.value);
  addWordToDOM(difficultyLevel);
  removeStartCard();
  let countdown = setInterval(decreaseTime, 1000);
  textInput.focus();
}

function playGame(e) {
  let playerInput = e.target.value;

  if (playerInput === randomWord.innerHTML) {
    continueGame();
  }
}

function continueGame() {
  addWordToDOM(difficultyLevel);
  textInput.value = '';
  increaseScore();
  increaseTime(difficultyLevel);
}

function endgame() {
  endGameCard.classList.add('end');
  textInput.blur();
  finalScore.innerHTML = `FINAL SCORE - ${score}`;
}

async function fetchWords() {
  const res = await fetch(
    'https://random-word-api.herokuapp.com/word?number=1000'
  );

  return await res.json();
}

async function addWordToDOM(value) {
  const wordArr = await fetchWords();
  const filtered = wordArr.filter(
    (word) => word.length >= value && word.length <= value + 2
  );

  randomWord.innerHTML = filtered[Math.floor(Math.random() * filtered.length)];
}

function removeStartCard() {
  startCard.classList.add('start');
  setTimeout(() => {
    startCard.style.zIndex = '-1';
  }, 750);
}

function determineDifficulty(value) {
  switch (value) {
    case 'easy':
      return 3;
      break;
    case 'medium':
      return 5;
      break;
    case 'hard':
      return 7;
      break;
    case 'extreme':
      return 9;
      break;
  }
}

function decreaseTime() {
  if (time === 0) {
    if (!gameOver) {
      endgame();
      gameOver = true;
    }
    return;
  }

  time--;
  timeLeft.innerHTML = `TIME LEFT - ${time}s`;
}

function increaseScore() {
  score++;
  scoreOnCard.innerHTML = score;
}

function increaseTime(value) {
  time += 10 - value;
}

// function beginCountdown() {
//   setInterval(() => {
//     time--;
//     timeLeft.innerHTML = `TIME LEFT - ${time}s`;
//   }, 1000);
// }

startBtn.addEventListener('click', initialiseGame);
textInput.addEventListener('input', playGame);
restartBtn.addEventListener('click', () => {
  location.reload();
});
