'use strict';

/** Generate Secret Number */
const generateSecretNumber = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
};

/** Random Number */
let secretNumber;
generateSecretNumber();
let score = 20;
let highScore = 0;
console.log('random number', secretNumber);

/** Dynamically update values & styles */
const displayMessageOrUpdateValue = function (
  selector,
  valueOrMessage,
  style = false,
  styleProperty,
  isInputField = false
) {
  !style
    ? !isInputField
      ? (document.querySelector(selector).textContent = valueOrMessage)
      : (document.querySelector(selector).value = valueOrMessage)
    : (document.querySelector(selector).style[styleProperty] = valueOrMessage);
};

/** Reset Game */
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  displayMessageOrUpdateValue('.guess', '', false, null, true);
  displayMessageOrUpdateValue('.number', '15rem', true, 'width');
  displayMessageOrUpdateValue('.number', '?');
  displayMessageOrUpdateValue('.score', score);
  displayMessageOrUpdateValue('.message', 'Start guessing...');
  displayMessageOrUpdateValue('body', '#222', true, 'backgroundColor');
  generateSecretNumber();
});

/** Event Handler when user clicks on "Check Button" */
document.querySelector('.check').addEventListener('click', function () {
  const guessNumber = +document.querySelector('.guess').value;
  if (!+guessNumber) {
    displayMessageOrUpdateValue('.message', 'Please provide number');
  } else if (guessNumber === secretNumber) {
    displayMessageOrUpdateValue('.message', 'Congratulations... You Won!');
    displayMessageOrUpdateValue('.number', '30rem', true, 'width');
    displayMessageOrUpdateValue('body', '#60b347', true, 'backgroundColor');
    displayMessageOrUpdateValue('.number', guessNumber);

    if (score > highScore) {
      highScore = score;
      displayMessageOrUpdateValue('.highscore', score);
    }
  } else if (guessNumber !== secretNumber) {
    if (score > 1) {
      score--;
      displayMessageOrUpdateValue(
        '.message',
        guessNumber > secretNumber ? 'Too High!' : 'Too Low!'
      );
      displayMessageOrUpdateValue('.score', score);
    } else {
      score--;
      displayMessageOrUpdateValue('.message', 'GAME OVER');
      displayMessageOrUpdateValue('.score', 0);
    }
  }
});
