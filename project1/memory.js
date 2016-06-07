"use strict";
var userPoints = 0;  // this number will keep track of the user's score
var arrayCards = [];  //this array will store all the cards used in the game
var numCards = 0;  //number of cards face up to the user
var cardPair = [];  //holds indicies of picked cards


for(var i = 0; i < 12; i++){
  arrayCards.push(i,i)
  $("#memoryBoard").append('<div class = "tile">')
  $("#memoryBoard").append('<div class = "tile">')
}



$(document).ready(function() {

  //defining click event
  //when a user clicks on a card, pickCard function is triggered
  $(".tile").on("click", pickCard);
  //when a user click on a card,
  $(".tile").on("click", startTimer);
});


function pickCard () {
  if (!($(this).hasClass('disabled')) && !($(this).hasClass('flip'))) {
    //allows user to keep picking cards until two cards are face up
    if (numCards < 2){
    //making a variable & storing the num of the clicked tile/div
      var divIndex = $('#memoryBoard .tile').index($(this));
    //keeping track of what card was picked and storing it in cardPair
      cardPair.push(divIndex);
      //on the clicked tile, show the value, align, add class-- temporarily flipped over
      $(this).html(arrayCards[divIndex]).addClass('flip');
    //adds one more cards face up
      numCards++;
      if(numCards === 2){
        setTimeout(function(){
          $(".flip").html('');
        }, 1300);
        compareCards();
      }

    } else {
    //if the card has been flipped & not a match, unflip

      console.log('here!');
      //flips over the two that were up that didnt match
      $('.flip').html("").removeClass('flip');
      numCards = 0;
    //get rid of the two cards already stored in cardPair
      cardPair.pop();
      cardPair.pop();
    }
  }
  if (userPoints===12) {
    promptWinner();
  }
}
//need to do something to the CSS to active/deactive the CSS
//eventually add a timer to have them flip back
function compareCards () {
  // if(arrayCards[cardPair[0]] != arrayCards[cardPair[1]]){
  if(arrayCards[cardPair[0]] === arrayCards[cardPair[1]]){
    userPoints++;
    //access cards that are flipped and disable them so they remain face up
    $('.flip').addClass('disabled').removeClass('flip');

    console.log(userPoints);


  }
//if two cards have been picked but dont match, they will be automatically put face down
  var autoFlipCards = setTimeout(function(){
    $(".flip").html('');
    $(".flip").removeClass('flip');
  }, 1300);

}

//This function will randomize the order of cards of an input array
function randomDeck (arrayCards) {
  var newArray = [];
  //make a random number
  for(var j = 0; j < 5; j++){
    for(var i = 0; i < 24; i++){
      var temp = arrayCards.pop();
      if(Math.random() > .5){
        //if the number is bigger than .5, push to new array
        newArray.push(temp);
      }
      //else unshift to new array
      else{
        newArray.unshift(temp);
      }
    }
    //at the end of the outside loop, put the cards back newArray to shuffle it again
    arrayCards = newArray;
    newArray = [];
  }

  console.log(newArray);
  console.log(arrayCards);
  return arrayCards;
}



function promptWinner() {
  alert('You win!');


}

function playGame () {

  arrayCards = randomDeck(arrayCards);

  // console.log('last' + arrayCards);

}
//on users first click, start timer
//store time in a variable
// when the user matches all the cards, or promptWinner() is called, stop the timer
var clock;
  function startTimer (){
  clock = setInterval(tictac, 1000)
}

function stopTimer (){

}

var counter = 0;
function tictac(){
counter++;
// $("#clock").html(counter);
//console.log(counter);
}
