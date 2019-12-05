//Variables
//From Jumbotron
var jumbotronEl = document.querySelector(".jumbotron");
var beginEl = document.getElementById("begin");

//From flip-cards

// Hides the Jumbotron on button click
beginEl.addEventListener("click", function(event) {
  event.preventDefault();
  jumbotronEl.classList.add("collapse");
});




// Step 1 —— Welcome Screen

// Add jumbotron with 'Go' Button

// When the 'Go' button is clicked, collapse this element.


// Step 2 —— Countdown to play starting

// Text element appears saying something like "the game starts in:"

// Timer appears (large) beneath text, and counts down "3..2..1.."

// Both elements collapse when timer = 0.

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