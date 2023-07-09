const PEGS = 4;
var COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
//var answer = ['red', 'blue', 'yellow', 'green'];

// The current game state
var answer = generateAnswer();
var guessHistory = [];
var resultHistory = [];
var guess = [];
var playerWon = false;


//--------------------------------------------------------

// returns: [] of colors of length PEGS
// example: ['red', 'blue', 'yellow', 'green']
// Hint: Math.floor(Math.random() * 6)
function generateAnswer() {
  var generatedAnswer = [];
  for (var i = 0; i < PEGS; i++) {
    var index = Math.floor(Math.random() * 6);
    generatedAnswer.push(COLORS[index]);
  }
  return generatedAnswer;
}

// logs the answer, used for testing
function cheat() {
  console.log(answer);
}

// push() a color to the guess
function appendPegToGuess(pegColor) {
  if (guess.length < PEGS) {
    guess.push(pegColor);
  }
  paint();
}

// pop() a color from the guess
function undoPegGuess() {
  guess.pop();
  paint();
}

// return: [] of black / white / gray
// example: ['black', 'white', 'white', 'gray']
function checkGuess() {
  result = ['gray', 'gray', 'gray', 'gray'];
  for (var i = 0; i < PEGS; i++) {
    if (answer[i] == guess[i]) {
      result[i] = 'black';
    }
  }
  for (var i = 0; i < PEGS; i++) {
    if (result[i] == 'gray') {
      for (j = 0; j < PEGS; j++) {
        if (result[j] != 'black' && answer[j] == guess[i]) {
          result[i] = 'white';
        }
      }
    }
  }
  return result;
}

// calls checkGuess
// sets  playerWon if the player won
// adds to history
function check() {
  if (guess.length < 4) {
    return;
  }

  var result = checkGuess();
  playerWon = isWinningResult(result);
  guessHistory.push(guess);
  guess = [];
  resultHistory.push(result);
  paint();
}

// removes all the color classes the element
// hint: element.classList.remove()
function clearColors(element) {
  element.classList.remove('peg-red');
  element.classList.remove('peg-orange');
  element.classList.remove('peg-yellow');
  element.classList.remove('peg-green');
  element.classList.remove('peg-blue');
  element.classList.remove('peg-purple');
}

// finds all the 'guess' pegs & calls clearColors on each
// hint: document.getElementsByClassName('guess');
function clearGuessColors() {
  var guessPegs = document.getElementsByClassName('guess');
  for (var j = 0; j < guessPegs.length; j++) {
    clearColors(guessPegs[j]);
  }
}

// loop through the guess pegs & set the color on each
// hint: document.getElementsByClassName('guess');
// hint: guessPegs[i].classList.add
function paintGuessPegs() {
  var guessPegs = document.getElementsByClassName('guess');
  for (var i = 0; i < guess.length; i++) {
    guessPegs[i].classList.add(`peg-${guess[i]}`);
  }
}

// sets the win/lose message & colors for the guesses & history
function paint() {
  setMessage();
  clearGuessColors();
  paintGuessPegs();
  paintHistory();
}

// sets the class to peg-${color} for one of the guess history pegs
// hint: document.querySelector(`[data-guess-history-id="${id}"]`);
function paintGuessHistory(attempt, index) {
  var id=`${attempt}${index}`;
  var peg = document.querySelector(`[data-guess-history-id="${id}"]`);
  var color = guessHistory[attempt][index];
  peg.classList.add(`peg-${color}`);
}

// sets the class to peg-${color} for one of the result history pegs
// hint: document.querySelector(`[data-result-history-id="${id}"]`);
function paintResultHistory(attempt, index) {
  var id=`${attempt}${index}`;
  var peg = document.querySelector(`[data-result-history-id="${id}"]`);
  var color = resultHistory[attempt][index];
  peg.classList.add(`peg-${color}`);
}

// for every attempt in the history, and each peg, paint it
function paintHistory() {
  for (var attempt = 0; attempt < guessHistory.length; attempt++) {
    for (var peg = 0; peg < PEGS; peg++) {
      paintGuessHistory(attempt, peg);
      paintResultHistory(attempt, peg);
    }
  }
}

// returns 'true' if the result is all black
function isWinningResult(result) {
  winning = true;
  for (var i = 0; i < PEGS; i++) {
    if (result[i] != 'black') {
      winning = false;
    }
  }
  return winning;
}

// Returns the instruction message to display:
//  Click the colors & Check Answer to play
//  You Won!! Refresh to play again
//  You lost :( Refresh to play again
function determineInstructionMessage() {
  var message = 'Click the colors & Check Answer to play';
    if (playerWon) {
      message = 'You Won!! Refresh to play again'
    }
    if (guessHistory.length == 8 && !playerWon) {
      message = 'You lost :( Refresh to play again'
    }
    return message;
}

// sets the right instruction message
function setMessage() {
  var message = determineInstructionMessage();
  document.getElementById('instructions').innerText=message;
}