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
var secondsToGo = 4

//From flip-cards



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
});

// Step 2 —— Countdown to play starting

// Timer appears (large) beneath text, and counts down "3..2..1.." Happens on event "click" of Jumbotron

//Step 3 –– The game itself

// For the page layout, we'll need: something to display time remaining, the question cards, and a link to the highscores page.

// Add questions to 'questions.js' and link to it.

// Timer

// Total time should = 15 seconds per question.

// Time remaining at the end = user's score. 

// Score then needs to be saved to localStorage, where it can be retrieved for highscores.

// Question Cards

// Make template card with area for text, 4 answers (a,b,c,d), and buttons to click

// Populate the cards with questions and answers: (for loop over array, pulling in data to card?)

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
