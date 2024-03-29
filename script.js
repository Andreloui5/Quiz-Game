//Variables
//From Jumbotron
var jumbotronEl = document.querySelector(".jumbotron");
var beginEl = document.getElementById("begin");

//From Countdown 
var countdownEl = document.querySelector('#countdown');
var nums = document.querySelectorAll('.nums span');
var counter = document.querySelector('.counter');
var finalMessage = document.querySelector('.final');
var gameEl = document.getElementById('gameMainPage');
var clockEl = document.getElementById('clock');
var secondsToGo = 4

//For Game Timer
//Our initial time gives 15 seconds per question, and allows for the four second countdown to the game. Because of this it's easy to add to the initial 'go' event button click.
let clockSecondsLeft = ((questionBank.length * 15) + 4)

//For populating questions
let submitEl = document.querySelector(".submitter");
let questionText = document.getElementById("title");
let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let choiceD = document.getElementById("D");
// Our questions.js choices
let QuestionIndex = questionBank.length - 1;
let currentQuestionIndex = 0;
//Audio Samples
let correctSound = new Audio("assets/Correct.mp3");
let incorrectSound = new Audio("assets/Incorrect.mp3");
let finishSound = new Audio("assets/Finsh.mp3");
// Final/Score Screen
let endScreenEl = document.getElementById("endScreen");
let finalScoreEl = document.getElementById("finalScore");
let saveHighScoreEl = document.getElementById("saveHighScore");
let userNameEl = document.getElementById("userName");
let pastHighScoresEl = document.getElementById("pastHighScores");
let allHighScores = [];

// Welcome Screen

// When the 'Go' button is clicked, collapses jumbotron element
beginEl.addEventListener("click", function(event) {
  event.preventDefault();
  jumbotronEl.classList.add("collapse");
  //shows the wrapper holding the countdown
  countdownEl.classList.remove("collapse");
  //begins countdown function
  runAnimationGo();
  //sets timer to clear countdown from screen
  var timerInterval = setInterval(function() {
    secondsToGo--;
    if(secondsToGo === 0) {
      //collapses the countdown section
      countdownEl.classList.add("collapse");
      //shows the game's main page
      gameEl.classList.remove("collapse")
    }
  }, 1000);

  // starts the game timer
  timeStart();

  // populates the main screen with questions/answers
  populate();
  
});

// The game timer:
function timeStart () {
  var clockTimer = setInterval(function() {
  //clock will decrement each interval
  clockSecondsLeft--;
  //this actually places the current time on the page
  clockEl.textContent = clockSecondsLeft;
  // if clock = 0, ends game and collapses game screen
  if(clockSecondsLeft === 0) {
    gameEl.classList.add("collapse");
    endScreenEl.classList.remove("collapse");
    endScreen()
  }
  //interval set to 1 second
}, 1000);
};

function populate() {
  // populate question box
    let i = questionBank[currentQuestionIndex];
    // pulls information from questions.js and the array(questionBank).
    questionText.textContent = i.title;
    choiceA.textContent = i.choices[0];
    choiceB.textContent = i.choices[1];
    choiceC.textContent = i.choices[2];
    choiceD.textContent = i.choices[3];
};

//When a button is clicked, this function checks the button against the value of 'answer' in questionBank
function checkAnswer(userAnswer) {
  // When all the questions have been answered, these things happen
  if (currentQuestionIndex === questionBank.length-1) {
    finishSound.play();
    gameEl.classList.add("collapse");
    endScreenEl.classList.remove("collapse");
    endScreen();
  }
  else {
    //If the answer was correct, these things happen
    if (userAnswer === questionBank[currentQuestionIndex].answer) {
      correctSound.play();
      clockSecondsLeft += 3;
      //each time a button is clicked, a new question populates the screen
      currentQuestionIndex++;
      populate();
    }
    //these things happen for incorrect answers
    else if (userAnswer !== questionBank[currentQuestionIndex].answer) {
      incorrectSound.play();
      clockSecondsLeft -= 15;
      //each time a button is clicked, a new question populates the screen
      currentQuestionIndex++;
      populate();
    }
}
};


// Step 4 —— Highscores

// At the end of the game, this function adds the large blue score value to the page, and clears the clocktimer
function endScreen() {
  localStorage.setItem("score", clockSecondsLeft);
  finalScoreEl.textContent = localStorage.getItem("score");
  clearInterval(clockTimer);
}

//Initializes score page
initalScores();

//function that pulls the highscores from local storage, checks to see if there are values, and then populates the highscore field.
function initalScores (){
let storedScores = JSON.parse(localStorage.getItem("highScores"));

  if (storedScores !== null) {
    allHighScores = storedScores;
   
  }
  populateScores();
}
//This function actually puts stored highscores on the page
function populateScores () {
  // clear out list
  pastHighScoresEl.innerHTML = "";
 
  //create li elements for each high score, and appends highscores to the page
  for (let i = 0; i < allHighScores.length; i++) {
    let highScore = allHighScores[i].score;
    let name = allHighScores[i].name
    let li = document.createElement("li");
    li.textContent = name + ": " + highScore;
    li.setAttribute("data-index", i);
    pastHighScoresEl.appendChild(li);
  }
}
//Stores all highscores
function storeHighScores() {
  console.log("this is our item" + allHighScores);
  localStorage.setItem("highScores", JSON.stringify(allHighScores));
}

//Adds save-button functions on click
saveHighScoreEl.addEventListener("click", function (event) {
    event.preventDefault();
//trims entry and provides 'unkown response' if field is empty
    let name = userNameEl.value.trim();
      if (name === "") {
        name === "unknown";
      }
    let scoreValue = localStorage.getItem("score");
//pushes values to allHighScores array
    allHighScores.push(
      {
        "name":name, 
        "score":scoreValue
      }
    );
    //stores values
    storeHighScores();
    //repopulates field
    populateScores();
});


//(The function runAnimationGo (and associated variables) were found at https://codepen.io/FlorinPop17/pen/LzYNWa and adapted to fit. Originally created by Florin Pop)

function runAnimationGo() {
	nums.forEach((num, idx) => {
		const penultimate = nums.length - 1;
		num.addEventListener('animationend', (e) => {
			if(e.animationName === 'goIn' && idx !== penultimate){
				num.classList.remove('in'); 
				num.classList.add('out');
			} else if (e.animationName === 'goOut' && num.nextElementSibling){
				num.nextElementSibling.classList.add('in');
			} else {
				counter.classList.add('hide');
				finalMessage.classList.add('show');
			}
		});
	});
}
