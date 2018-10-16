var rangeBegin = 1;
var rangeEnd = 100;
var rangeDifference = rangeEnd - rangeBegin;
var winningNumber = generateRandom();
var clearButton = select('.clear-button');
var resetButton = select('.reset-button');
var submitButton = select('.submit-button');
var updateButton = select('.update-button');
var user1Guess = 0;
var user2Guess = 0;
var numGuessTries = 0;

/*  Event Listeners  */

updateButton.addEventListener("click", setRange);
submitButton.addEventListener("click", setGuesses);
clearButton.addEventListener("click", clearInput);
resetButton.addEventListener("click", initializeForm);

initializeForm();



/* change all of doc.query to function called SELECT*/ 
/* add prevent default, should be for whole page? */ 


// function addWinCard () {
//   select('.user-1-name').innerText = "sponge bob";
//   select('.user-2-name').innerText = "leroy";
//   select('.user-winner').innerText = "someone";
//   select('.win-guesses').innerText = numGuessTries;
//   select('.win-elapsed-time').innerText = getElapsedTime;
// }


function clearInput() {
  select('#guess1').value = null;
  select('#guess2').value = null;
  select('#min-range').value = null;
  select('#max-range').value = null;
  disableButton(clearButton);
};


// function extra0(inputValue) {
//   if (inputValue[0] === '0' && inputValue.length > 1) {
//     return true;
//   } else {
//     return false;
//   }
// }


// function checkRange0s() {
//   if (extra0(select('#min-range').value) || extra0(select('#max-range').value)) {
//     throwError('.error-message-range', 'Remove unneccesary zeros');
//     return true;
//   } 
// }


function checkSmallMax() {
  if (rangeBegin > rangeEnd) {
    throwError('.error-message-range', `Max range must be greater than ${rangeBegin}`);
    return true;
  }
}

function checkRangeFloat() {
  if (!Number.isInteger(rangeBegin) || !Number.isInteger(rangeEnd)) {
    throwError('.error-message-range', 'Enter integers');
    return true;
  } 
}

function checkGuess(userGuess, player) {
  if (userGuess == winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "BOOM!";
  } else if (userGuess > winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "that is too high";
  } else if (userGuess < winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "that is too low";
  }
}

function changeButton(button) {
  if (button.disabled == true) {
    button.disabled = false;
    button.classList.add("hover");
  } else if (button.disabled == false) {
    button.disabled = true;
    button.classList.remove("hover");
  }
}

function getRange() {
  rangeBegin = parseFloat(select('#min-range').value);
  rangeEnd = parseFloat(select('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
}

function initializeForm() {
  // addWinCard();
  clearInput();
  // setRange();
  numGuessTries = 0;
  rangeDifference = rangeEnd - rangeBegin;
  winningNumber = generateRandom();
  resetTheButtons();
  select('.range-begin').innerText = 1;
  select('.range-end').innerText = 100;
  select('.user-1-last-guess').innerText = "";
  select('.user-2-last-guess').innerText = "";
  hideError('.error-message-range');
  hideError('.error-message-guess-1');
  hideError('.error-message-guess-2');
}

function generateRandom() {
  var randomNumber = Math.floor(Math.random() * (rangeDifference + 1)) + rangeBegin;
// select('.winning-number').innerText = randomNumber;
return randomNumber;
}

function setGuesses (event) {
  event.preventDefault();
  user1Guess = parseFloat(select('#guess1').value);
  user2Guess = parseFloat(select('#guess2').value);
  var user1Name = select('#challenger-1-name').value;
  var user2Name = select('#challenger-2-name').value;
  validateGuess([user1Guess, user2Guess], [user1Name, user2Name]);

// guessCounter();
}

function getElapsedTime () {
  var start = new Date();
  var elapsed = new Date() - start;
  /* return ((elapsed / 1000) / 60).toFixed(1);  */ 

}

function guessCounter() {
  if (select('.error-message-guess').classList.contains('hidden')) {
    numGuessTries += 1;
    select('h4').innerText = "Number of Guesses: " + numGuessTries;
  }
}

function hideError(field) {
  if (!select(field).classList.contains('hidden')) {
    select(field).classList.add('hidden');
  }
}

function resetTheButtons() {
  disableButton(resetButton);
  disableButton(clearButton);
}

function select(field) {
  return document.querySelector(field);
}

function setRange(event) {
  event.preventDefault(); 
  getRange();
  validateRange();
  enableButton(resetButton);
  enableButton(clearButton);
}

function throwError(field, message) {
  var pTagSelector = field + ' p';
  select(field).classList.remove('hidden');
  select(pTagSelector).innerText = message;
}

function validateGuess(guesses, names) {
  for(var i = 0; i < 2; i++) {
    if (checkGuessFloat(guesses[i], i) || checkOutOfRange(guesses[i], i)) {
      console.log('break')
      break;
    } else {
      hideError(`.error-message-guess-${i + 1}`);
      select(`.name-${i + 1}`).innerText = names[i];
      select(`.user-${i + 1}-last-guess`).innerText = guesses[i];
      checkGuess(guesses[i], i);
      enableButton(clearButton);
      enableButton(resetButton);
    }
  }
}

function checkGuessFloat(guess, i) {
  if (!Number.isInteger(guess)) {
      throwError(`.error-message-guess-${i + 1}`, 'Enter an integer');
      return true;
  }
}

function checkOutOfRange(guess, i) {
  if (guess < rangeBegin || guess > rangeEnd) {
    throwError(`.error-message-guess-${i + 1}`, `Enter a number between ${rangeBegin} and ${rangeEnd}`);
    return true;
  } 
}

function validateRange () {
  if(checkRangeFloat() || checkSmallMax()) {
    disableButton(submitButton);
  } else {
    hideError('.error-message-range');
    enableButton(submitButton);
    select('.range-begin').innerText = rangeBegin;
    select('.range-end').innerText = rangeEnd;
    winningNumber = generateRandom();
  }
}

function disableButton(button) {
  button.disabled = true;
  button.classList.remove("hover");
}

function enableButton(button) {
  button.disabled = false;
  button.classList.add("hover");
}