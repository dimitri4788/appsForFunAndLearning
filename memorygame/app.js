//An array of images for the game
var gameImages = [
    "images/one.png",
    "images/two.png",
    "images/three.png",
    "images/four.png",
    "images/five.png",
    "images/six.png",
    "images/seven.png",
    "images/eight.png",
    "images/nine.png",
    "images/ten.png"
];

//This function initializes the game board
function initializeGameBoard() {
    //Remove all child images of #gameBoardHalloweenImages
    $("#gameBoardHalloweenImages").empty();

    //Fill #gameBoardHalloweenImages with images
    for(var j = 0; j < 2; ++j) {
        for(var i = 0; i < gameImages.length; ++i) {
            console.log("gameImages[]: " + gameImages[i]);
            $("#gameBoardHalloweenImages").append('<div id="'+j+i+'"><img src='+gameImages[i]+'></div>');
        }
    }
}

//Reset the game
function resetGame() {
    //Reset the score
    $("#score").text("0");

    //Initialize the game board
    initializeGameBoard();

    //Shuffle the images
    //shuffleImages(); TODO
}

function main() {
    initializeGameBoard();
    //#().click();
    $("#resetButton").click(resetGame);
}

$(document).ready(main());

/*
<div id="gameBoard">
<div class="gameControllerAndStats">
<span id="scoreData">Score: <output name="score" id="score">0</output></span>
<span id="resetButton">RESET</span>
<div id="gameBoardHalloweenImages"></div>
*/
