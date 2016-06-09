"use strict";
var userPoints = 0;  // this number will keep track of the user's score
var arrayCards = [];  //this array will store all the cards used in the game
var numCardsFaceUp = 0;  //number of cards face up to the user
var cardPair = [];  //holds indicies of picked cards
var size = 0;
var divColors = ['#57416B','#5A5387','#4873A6','#51A5D4','#42CAC6'];

var currentColor = '';

function makingTileBoard (){
  var difficulty = $('button').index($(this));
  $(".intro").remove();
  if(difficulty === 0){
    size = 4;
  }
  else if(difficulty === 1){
    size = 5;
  }
  else{
    size = 6;
  }
  //this creates the first dynamic row
  for(var i = 0; i < size*(size-1); i++){
    //if i is a multiple of size, this makes a row
    var newRow = (i%size === 0);
    if (newRow) {
      currentColor = divColors.pop();
    }
    console.log(newRow, i)

    //this INSERTS! divs into rows

      console.log(i)
      //how do i make the array of cards inside these nested for loops
      arrayCards.push(Math.floor((i)/2));
      $("#memoryBoard").append('<div class="tile" data-new-row="'+newRow+'"  style="background-color:'+currentColor+';"></div>');
  }
  //this loops makes the array of cards

  // for(var i = 0; i < (size*(size-1)/2); i++) {
  //   arrayCards.push(i,i);
  // }
  $('.someButton').on('click', resetGame); //<-- need to work on this
  $(".tile").on("click", pickCard);
  //when a user click on a card,
 // $(".tile").on("click", startTimer);
  arrayCards = randomDeck(arrayCards);
  startTimer();
}



$(document).ready(function() {

  //when a user clicks on a card, pickCard function is triggered
  loadGame();
  $('button').on("click", makingTileBoard);

});

function loadGame (){
  $("body").append('<div class = "intro name">MEMORY MATRiX</div>').css({'padding-top': '30px', 'background-color': '#C3DADB'})
  $("body").append('<div class = "intro subHeader">pick your poison</div>')
  $('.name').animate({'top': '500px'}, 'slow');
  $("body").append('<button class = "intro" type="button">Easy</button>').css({'margin-left': 'auto',
  'margin-right': 'auto', 'color' : 'white', 'text-align' : 'center'})
  $("body").append('<button class = "intro" type="button">Intermediate</button>').css({'margin-left': 'auto',
  'margin-right': 'auto', 'color' : 'white', 'text-align' : 'center'})
  $("body").append('<button class = "intro" type="button">Hard</button>').css({'margin-left': 'auto',
  'margin-right': 'auto', 'color' : 'white', 'text-align' : 'center'})
//  alert('in load game');
//  $('button').on("click", makingTileBoard);

}


function pickCard () {
  //alert('you are inside "pickCard func"');
  if (!($(this).hasClass('disabled')) && !($(this).hasClass('flip'))) {
    //allows user to keep picking cards until two cards are face up
    //debugger;
    if (numCardsFaceUp < 2){
    //making a variable & storing the num of the clicked tile/div
      var divIndex = $('#memoryBoard .tile').index($(this));
    //keeping track of what card was picked and storing it in cardPair
      cardPair.push(divIndex);
      //on the clicked tile, show the value, align, add class-- temporarily flipped over
      $(this).html(arrayCards[divIndex]).addClass('flip');
    //adds one more cards face up
      numCardsFaceUp++;
      if(numCardsFaceUp === 2){
        // setTimeout(function(){
        //   $(".flip").html('');
        // }, 1300);
        compareCards();
      }

    } else {
    //if the card has been flipped & not a match, unflip
// alert("Why are we here?");
      // debugger;
      // console.log('here!');
      //flips over the two that were up that didnt match
      $('.flip').html("").removeClass('flip');
      numCardsFaceUp = 0;
    //get rid of the two cards already stored in cardPair
      cardPair.pop();
      cardPair.pop();
    }
  }
  if (userPoints=== (size*(size-1)/2)) {
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
    // alert('flipping!')
    $(".flip").removeClass('flip');
    numCardsFaceUp = 0;
    cardPair.pop();
    cardPair.pop();
  }, 1300);

}

//This function will randomize the order of cards of an input array
function randomDeck (arrayCards) {
  var newArray = [];
  //make a random number
  for(var j = 0; j < 5; j++){
    for(var i = 0; i < size*(size-1); i++){
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
  stopTimer();

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
  clock = setInterval(tictac, 1000);

}

function stopTimer (){
  //debugger;
  var clock =  $(".clock").html();
  $(".clock").html(clock);

;
}

var counter = 0;
function tictac(){
counter++;
var min= Math.floor(counter/60);
var sec= counter % 60;
 $(".clock").html(min + ":" + sec);
}
function resetGame(){

}
