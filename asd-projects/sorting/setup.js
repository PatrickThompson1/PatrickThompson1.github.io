/////////////////////////////////////////////////
//////////////// Define variables ///////////////
/////////////////////////////////////////////////


/////////////////////////////////////////////////
// THE CONSTANTS BELOW MAY BE ALTERED FOR EXPERIMENTATION PURPOSES


// set the delay between each sort step
const SLEEP_AMOUNT = 500;


// set the max number of squares
const MAX_SQUARES = 16;


// set constants for pseudo-random number generation
const SEED = 2;
const FACTOR = 1774339;
const INCREASE = 7181930;


/////////////////////////////////////////////////
// ALL CONSTANTS BELOW HERE SHOULD NOT BE ALTERED


// values related to drawing the sorting grid
const IMAGE_SIZE = 256;                         // pixels
const MAX_SQUARE_WIDTH = 25;                    // percentage of width
const MAX_SQUARE_HEIGHT = 1/MAX_SQUARES*100;    // percentage of height


// define the arrays that will store all created HTML elements
const bubbleList = [];
const quickList = [];


// define the ids of the divs containing the created elements
const bubbleId = "#displayBubble";
const quickId = "#displayQuick";
const bubbleContainer = "#bubbleArea";
const quickContainer = "#quickArea";
const bubbleCounter = "#bubbleCounter";
const quickCounter = "#quickCounter";


// define the base ids of the created elements (numbers will be added to make them unique)
const bubbleElementBaseId = "bubble";
const quickElementBaseId = "quick";


// define the classes of the elements
const elementClass = "sortElement";
const bubbleClass = "bubbleElement";
const quickClass = "quickElement";


// create undefined functions so that the program won't crash pre-function creation
var bubbleSort, quickSort;


/////////////////////////////////////////////////
///////////////// Run the setup /////////////////
/////////////////////////////////////////////////


$(document).ready(function(){
 // resize the containers to fit everything
 let squareHeight = $(bubbleId).width() * (Math.min((1 / MAX_SQUARES * 100), MAX_SQUARE_WIDTH)/100);


 $(bubbleId).height(squareHeight*MAX_SQUARES);
 $(quickId).height(squareHeight*MAX_SQUARES);


 // create the two lists and all elements
 generateList(bubbleList, bubbleId, bubbleClass, bubbleElementBaseId);
 generateList(quickList, quickId, quickClass, quickElementBaseId);
});


/////////////////////////////////////////////////
/////////////// Helper functions ////////////////
/////////////////////////////////////////////////


function generateList(list, listId, cssClass, baseId){
 let numbers = [];


 for (var i = 1; i <= MAX_SQUARES; i++){
     numbers.push(i);
 }


 let nextIndex = SEED;
 for (var i = 0; i < MAX_SQUARES; i++){
     nextIndex = chooseIndex(nextIndex, numbers);


     createAndAddElement(list, listId, cssClass, baseId, numbers[nextIndex]);


     numbers.splice(nextIndex, 1);
 }
}


function chooseIndex(startIndex, array){
 return (startIndex * FACTOR + INCREASE) % array.length;
}


function createAndAddElement(list, listId, cssClass, baseId, value){
 let newElement = makeElement(baseId + value, value);


 let offset = list.length / MAX_SQUARES * 100;
 list.push(newElement);


 $("<div>").addClass(cssClass)
           .addClass(elementClass)
           .attr("id", baseId+value)
           .css("height", MAX_SQUARE_HEIGHT + "%")
           .css("width", MAX_SQUARE_HEIGHT * value + "%")
           .css("background-size", 100/value + '% '+ 100 + '%')
           .css("top", offset + "%")
           .appendTo(listId);
}


function makeElement(id, value){
 return {
     id: "#" + id,
     value: value
 };
}
