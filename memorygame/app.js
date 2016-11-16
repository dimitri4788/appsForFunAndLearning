"use strict";

//An array of images for the game
const gameImages = [
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

//Image object
function Image(id, name) {
    this._id = id;
    this._name = name;

    //Show the image
    this.show = function() {
        $("#" + this._id + " img").slideDown(300);
    };

    //Hide the image
    this.hide = function() {
        $("#" + this._id + " img").slideUp(300);
    };
}

//Board object
function Board(parentDivId) {
    //A counter to keep track of number of clicks
    this._clickscounter = 0;

    //A dictionary to hold => key: image-id and value: Image() object
    this._imageObjects = {};

    //An array of Image() objects
    this._imagesArray = [];

    //Images parent div id
    this._parentDivId = parentDivId;

    //This function initializes the game board
    this.initialize = function() {
        //Create all the Image() objects and store them in this._imageObjects
        var imageObj;
        for(var j = 0; j < 2; ++j) {
            for(var i = 0; i < gameImages.length; ++i) {
                imageObj = new Image((""+j+i), gameImages[i]);
                this._imageObjects[(""+j+i)] = imageObj;
                this._imagesArray.push(imageObj);
            }
        }

        //Fill the board with images
        this.fillBoardWithImages();

        //Shuffle the images
        this.shuffleImages();
    };

    //Fill the board with images
    this.fillBoardWithImages = function() {
        var imageObj;
        for(var i = 0; i < this._imagesArray.length; ++i) {
            imageObj = this._imagesArray[i];
            $("#" + this._parentDivId).append('<div id="'+imageObj._id+'"><img src='+imageObj._name+'></div>');
        }
    };

    //This function resets the game board
    this.reset = function() {
        console.log("deeeepd: ");
        //Set counter back to zero
        this._clickscounter = 0;

        //Reset the counter (# turns) display
        $("#score").text("0");

        //Hide the images
        $("#" + this._parentDivId + " div img").hide();

        //Shuffle the images and fill the board again
        this.shuffleImages();
    };

    //This function gets called when the div (containing image) is clicked
    this.divClicked = function(divElement) {
        var imageId = divElement.attr("id");
        console.log("divElement: " + JSON.stringify(divElement)); //XXX

        //Get the image object
        var imageObj = this._imageObjects[imageId];
        //console.log("imageObj: " + JSON.stringify(imageObj)); //XXX

        if($("#" + imageObj._id + " img").is(":hidden")) {
            //Remove the attached event handler from the divs children
            $("#" + this._parentDivId + " div").unbind("click", this.divClicked);

            //Show the image
            imageObj.show();

            //Show the image in 0.5 second duration
            //$("#" + imageId + " img").slideDown(300);
        }
    };

    //This function performs random shuffling of the images
    this.shuffleImages = function() {
        var parentDiv = $("#" + this._parentDivId);
        var childrenDivs = parentDiv.children();
        while(childrenDivs.length) {
            parentDiv.append(childrenDivs.splice(Math.floor(Math.random() * childrenDivs.length), 1)[0]);
        }
    };
}

//Magic starts here
function main() {
    //Initialize the board
    var board = new Board("gameBoardHalloweenImages");
    board.initialize();

    //Bind event handlers to the "click" event
	$("#gameBoardHalloweenImages div").click(function() { board.divClicked($(this)); });
    $("#resetButton").click(function() { board.reset(); });

    //Shuffle the images
    //shuffleImages();
}

$(document).ready(main());
