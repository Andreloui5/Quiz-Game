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


// Step 1 —— Welcome Screen

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
      countdownEl.classList.add("collapse");
      gameEl.classList.remove("collapse")
    }
  }, 1000);
  // starts game time
  timeStart();

  // starts game main
  populate();
  
});




// Step 2 —— Countdown to play starting

// Timer appears (large) beneath text, and counts down "3..2..1.." Happens on event "click" of Jumbotron

//Step 3 –– The game itself

// For the page layout, we'll need: something to display time remaining, the question cards, and a link to the highscores page.

// Add questions to 'questions.js' and link to it.

// Clock
// Total time = 15 seconds per question.

function timeStart () {
  var clockTimer = setInterval(function() {
  clockSecondsLeft--;
  clockEl.textContent = clockSecondsLeft;
  // if clock = 0, ends game and collapses game screen
  if(clockSecondsLeft === 0) {
    gameEl.classList.add("collapse");
    return
  }
}, 1000);
};
// Time remaining at the end = user's score. 

// Score then needs to be saved to localStorage, where it can be retrieved for highscores.

// Question Cards

// Make template card with area for text, 4 answers (a,b,c,d), and buttons to click
// Populate the cards with questions and answers: (for loop over array, pulling in data to card?)

function populate() {
  // populate question box
    let i = questionBank[currentQuestionIndex];
    questionText.textContent = i.title;
    choiceA.textContent = i.choices[0];
    choiceB.textContent = i.choices[1];
    choiceC.textContent = i.choices[2];
    choiceD.textContent = i.choices[3];
};

function checkAnswer(userAnswer) {
  if (currentQuestionIndex === questionBank.length-1) {
    finishSound.play();
    gameEl.classList.add("collapse");
    localStorage.setItem("score", clockSecondsLeft);
  }
  else {
    if (userAnswer === questionBank[currentQuestionIndex].answer) {
      correctSound.play();
      clockSecondsLeft += 3;
      currentQuestionIndex++;
      populate();
    }
    else if (userAnswer !== questionBank[currentQuestionIndex].answer) {
      incorrectSound.play();
      clockSecondsLeft -= 15;
      currentQuestionIndex++;
      populate();
    }
}
};

function endingScreen () {
  if (currentQuestionIndex > questionBank.length) {
    finishSound.play();
    gameEl.classList.add("collapse");
  }
}

// function finalScore() {
//   localStorage.
// }

// Buttons should:
  // if (correct) {
  //   happy sound
  //   change button from 'letterChoice' to 👍🏻
  //   score/time ++ 2 or 3 seconds
  // }
  // else {
  //   sad sound
  //   change button to 🙁
  //   score/time -- 15 seconds
  // }

// collapse all elements from Game

// Step 4 —— Highscores

// Display table w highscores and names

// include input area underneath where user can add name

// post user name (if given, else include 'unknown' placeholder for name) and score, if > current highscores.

// post large button to 'play again', which loops to Step 3.





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
