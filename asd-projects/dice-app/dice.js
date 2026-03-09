function makeDot(top, left, elementID) {
 $("<div>")
   .css("height", 15)
   .css("width", 15)
   .css("background-color", "black")
   .css("border-radius", "50%")
   .css("position", "absolute")
   .css("top", top)
   .css("left", left)
   .appendTo(elementID);
}


function rollDie(dieID) {


 $(dieID).empty();


 var randomNum = Math.ceil(Math.random() * 6);


 if (randomNum === 1) {
   makeDot(50, 50, dieID);
 }


 else if (randomNum === 2) {
   makeDot(25, 25, dieID);
   makeDot(75, 75, dieID);
 }


 else if (randomNum === 3) {
   makeDot(25, 25, dieID);
   makeDot(75, 75, dieID);
   makeDot(50, 50, dieID);
 }


 else if (randomNum === 4) {
   makeDot(25, 25, dieID);
   makeDot(25, 75, dieID);
   makeDot(75, 25, dieID);
   makeDot(75, 75, dieID);
 }


 else if (randomNum === 5) {
   makeDot(25, 25, dieID);
   makeDot(25, 75, dieID);
   makeDot(75, 25, dieID);
   makeDot(75, 75, dieID);
   makeDot(50, 50, dieID);
 }


 else if (randomNum === 6) {
   makeDot(25, 25, dieID);
   makeDot(25, 75, dieID);
   makeDot(50, 25, dieID);
   makeDot(50, 75, dieID);
   makeDot(75, 25, dieID);
   makeDot(75, 75, dieID);
 }


 return randomNum; // 🔥 important for total
}


function rollBothDice() {
 var num1 = rollDie("#die");
 var num2 = rollDie("#die2");


 $("#total").text(num1 + num2);
}


/* Clicking either die rolls both */
$("#die").on("click", rollBothDice);
$("#die2").on("click", rollBothDice);