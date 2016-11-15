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

//A counter to keep track of number of clicks
var counter = 0;

//This function initializes the game board
function initializeGameBoard() {
    //Remove all child images of #gameBoardHalloweenImages
    $("#gameBoardHalloweenImages").empty();

    //Fill #gameBoardHalloweenImages with images
    for(var j = 0; j < 2; ++j) {
        for(var i = 0; i < gameImages.length; ++i) {
            $("#gameBoardHalloweenImages").append('<div id="'+j+i+'"><img src='+gameImages[i]+'></div>');
        }
    }
}

//Reset the game
function resetGame() {
    //Set counter back to zero
    counter = 0;

    //Reset the counter (# turns) display
    $("#score").text("0");

    //Shuffle the images
    shuffleImages();

    //Hide all the images that may be open
	$("#gameBoardHalloweenImages div img").hide();

    //Make all the divs inside #gameBoardHalloweenImages visible
	$("#gameBoardHalloweenImages div").css("visibility", "visible");
}

//This function show the image when it is clicked
function showImage() {
    var imageId = $(this).attr("id");
    console.log("imageId: " + imageId);

	if($("#" + imageId + " img").is(":hidden")) {
        //Remove the attached event handler from the divs children of #gameBoardHalloweenImages
		$("#gameBoardHalloweenImages div").unbind("click", showImage);

        //Show the image in 0.5 second duration
		$("#" + imageId + " img").slideDown(500);
    }
}

//This functions shuffles the images on the board
function shuffleImages() {
    //TODO
    console.log("TODO");
}

//Magic starts here
function main() {
    //Initialize the board
    initializeGameBoard();

    //Bind event handlers to the "click" event
	$("#gameBoardHalloweenImages div").click(showImage);
    $("#resetButton").click(resetGame);

    //Shuffle the images
    shuffleImages();
}

$(document).ready(main());
