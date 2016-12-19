//Game class; controls the game
function Game() {
    this.number = (Math.random()).toString().slice(2,6);
    this.lastGuessCounter = 1;

    //Generate random number
    this.generateNextNumber = function generateNextNumber() {
        return (Math.random()).toString().slice(2,6);
    };

    //This function resumes the game
    this.resumeGame = function resumeGame() {
        $(".how-to-play-descp").hide()
        $("#container").show()
        $("#guess1").focus();
    };

    //This function resets the game
    this.resetGame = function resetGame() {

    };

    //This function sets the next input
    this.nextInput = function nextInput() {
        $("#guess" + this.lastGuessCounter).prop("disabled", false);
        $("#guess" + this.lastGuessCounter).focus();
    };
}

//Board class
function Board() {
    //Initialize the game
    this.initializeBoard = function initializeBoard() {
        $("#guess1").prop("disabled", false);
        $("#guess1").focus();
    };

    //This function toggets
    this.toggleHelp = function toggleHelp(event) {
        $(".how-to-play-descp, #container").toggle()
        $("#guess1").focus();
    };
}

//Magic starts here
function main() {
    var board = new Board();
    board.initializeBoard();

    var game = new Game();
    console.log(game.number); //XXX

    //Bind all the events
    $(".how-to-play").click(board.toggleHelp);
    $(".resume-game").click(game.resumeGame);

    //Enter keyup should read the entered guess
    $(document).keyup(function(event) {
        //Check for enter key (code: 13) pressed
        if(event.which === 13) {
            //Get the guessed number
            var $currInputField =  $("#guess" + game.lastGuessCounter);
            var guessedNumber = $currInputField.val();
            console.log("game.lastGuessCounter: " + game.lastGuessCounter);
            console.log("guessed number: " + guessedNumber);

            //Disable current input field
            $currInputField.prop("disabled", true);

            //Increase the guess counter
            game.lastGuessCounter += 1;

            //Get ready for the next input
            game.nextInput();
        }
    });
}

$(document).ready(main());
