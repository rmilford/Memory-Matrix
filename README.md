```
#Memory-Matrix

[A game of concentration, programmed in JavaScript & jQuery.]
(https://github.com/rmilford/Memory-Matrix)

##Synopsis

The following project is an **exciting** game of memory (aka concentration) where a player must click on two tiles to find  matching tiles and remember where each match is before the tile filps back over and disappears. Once the user finds a match, the cards stay face up. An additional feature allows the user to choose between three exciting board sizes for a variety of experience levels. Additionally, the user can now try to beat their best time for finding all the matches with the addition of a timer.


##Code Example

This program uses a jQuery library. The following code is a snippet of code that generates the size of the board based on the user's input. The function 'makingTileBoard' says, index which button the user clicks on and save it into a variable called 'difficulty.' Then, if the user clicked on the first button on the page, the variable size is 4, if they click on the second button, size is 5, and if they click on the third button, size is 6. Then, the based on which button they clicked on, the computer generates a row based on the variable size. The output of the for loop is then dynamic based on the users input. The inside of the for loop is a boolean that says, 'newRow' returns true when i is divisible by size and has remainder of zero. When newRow returns true, the program changes the div color of the new row and pops the old color of the div out.

function makingTileBoard (){
  var currentColor = '';
  var size = 0;
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
  var myTileBoard = new TileBoard(size);

  //this creates the first dynamic row
  for(var i = 0; i < size*(size-1); i++){

    var newRow = (i%size === 0);
    if (newRow) {
      currentColor = myTileBoard.divColors.pop();
    }
      myTileBoard.arrayCards.push(Math.floor((i)/2));
      $("#memoryBoard").append('<div class="tile" data-new-row="'+newRow+'"  style="background-color:'+currentColor+';"></div>');
  }

  $(".tile").on("click", myTileBoard, myTileBoard.pickCard);//<--

  myTileBoard = myTileBoard.randomDeck();
  startTimer();
}


##Motivation

The motivation behind this project was learning more about my strengths and weaknesses as a new programmer trying to build a small application for the first time and find out about the struggles I experienced in the process. This was also a chance to practice wireframing, pseudocoding, experimenting with jQuery library, learning more about the capabilities of JavaScript's use in the browser, and even having a little fun with writing my own test specs with Jasmine. 


##Tests

In this project, there are Jasmine tests used as a framework to test the code that can be tested on a local server using testem, a JSON package. An example of the test suite should look like the following:

describe("createDeck", function() {
  it("should store the value of a deck of cards in an array", function() {
    var userPoints;
    var arrayCards;
    //store the value in an array
    expect([]).toEqual([]);
    arrayCards = [];
  });



##Contributors

If you want more information on the project, you can reach out to the developer on Twitter @rebekahmilford

```
