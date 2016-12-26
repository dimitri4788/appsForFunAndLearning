//Browser's window size
var browserWidth;
var browserHeight;

//Snowflake objects
var snowflakes = [];

//Number of snowflakes
var numberOfSnowflakes = 150;

//Snowflake constructor object
function Snowflake(element, xPos, yPos, speed) {
	//Snowflake properties
    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;

	//Set opacity and size for our snowflake element
    this.element.css("opacity", .1 + Math.random());
    this.element.css("font-size", 12 + Math.random() * 50 + "px");

	//Variables for snowflake's motion
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;
}

//This function moves the snowflake
Snowflake.prototype.update = function() {
	//Math to calculate x and y position for a snowflake
    this.counter += this.speed / 5000;
    this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
    this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;

	//Set the snowflake's position
    this.element.css("transform", "translate(" + Math.round(this.xPos) + "px, " + Math.round(this.yPos) + "px)");

    //When snowflake hits the bottom of the window, move it up
    if(this.yPos > browserHeight) {
    	this.yPos = -30;
    }
}

//This functions does the actual showering of the snow
function showerSnow() {
    //Go over all the snow-flakes and update their position on the window
    for(var i = 0; i < snowflakes.length; i++) {
        var snowflake = snowflakes[i];
        snowflake.update();
    }

    //Shower every 20 milliseconds
    setTimeout(function() { showerSnow(); }, 20);
}

//This function returns a number between (maximum - offset) and (maximum + offset)
function getPosition(offset, size) {
	return Math.round((Math.random() * (size+2*offset)) - offset);
}

//This function starts the snowfall
function startSnowfall() {
    //Get the snow flake div element
    var snowFlakeDiv = $("#snow-flakes-container");

    //Get the browser's size
	browserWidth = $(window).width();
    browserHeight = $(window).height();

    //Create snow flakes and add to the snowFlakeDiv
    for(var i = 0; i < numberOfSnowflakes; i++) {
    	//Create a snow-flake element
        var snowFlakeElem = $("<p class='snow-flake'>*</p>");

        //Add the new element to the snowFlakeDiv
        snowFlakeDiv.append(snowFlakeElem);

        //Create Snowflake object and push it to snowflakes array
        var snowflakeObject = new Snowflake(snowFlakeElem, getPosition(50, browserWidth), getPosition(50, browserHeight), Math.random() * 50);
        snowflakes.push(snowflakeObject);
    }

	//Start the snow shower
    showerSnow();
}
