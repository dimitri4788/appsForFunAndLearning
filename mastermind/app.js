(function($, window, document) {
    var model = {
        number: "",
        lastGuessCounter: 0
    };

    var controller = {
        //Initialize the controller
        init: function() {
            view.init();
        },

        //Returns the number
        getNumber: function() {
            return model.number;
        },

        //Returns the last guess counter from the model
        getLastGuessCounter: function() {
            return model.lastGuessCounter;
        },

        //Returns the last guess counter from the model
        setLastGuessCounter: function(counter) {
            model.lastGuessCounter = counter;
        },

        //Generate random number
        generateNewNumber: function() {
            model.number = (Math.random()).toString().slice(2,6);
        },

        checkGuessedNumber: function(guessedNumber) {
            var green = 0;
            var red = 0;
            correctNumberArr = model.number.toString().split("");
            userNumberArr = guessedNumber.split("");

            //Loop over the arrays to check for the correct number and correct position
            correctNumberArr.forEach(function(value, index) {
                if(userNumberArr[index] === correctNumberArr[index]) {
                    userNumberArr[index] = "u";
                    correctNumberArr[index] = "c";
                    green += 1;
                }
            });

            //Loop over again to check for the correct number but at incorrect position
            correctNumberArr.forEach(function(value, index) {
                var indexOfNumberAtIncorrectPosition = correctNumberArr.indexOf(userNumberArr[index]);
                if(indexOfNumberAtIncorrectPosition >= 0) {
                    correctNumberArr[indexOfNumberAtIncorrectPosition] = "";
                    red += 1;
                }
            });

            return [green, red]
        }
    };

    var view = {
        //Initialize the view
        init: function() {
            this.initializeGame();

            //Handle how to play help click event
            $(".how-to-play").click(function() {
                view.showHelp();
            });

            //Handle resume click event
            $(".resume-game").click(function() {
                view.showBoard();
            });

            //Handle reset game click event
            $(".reset-game").click(function() {
                view.showBoard();
                view.initializeGame();
            });

            //Enter keyup should read the entered guess
            $(document).keyup(function(event) {
                //Check for enter key (code: 13) pressed
                if(event.which === 13) {
                    //Get the guessed number
                    var $currInputField =  $("#guess" + controller.getLastGuessCounter());
                    if($currInputField.is(":invalid")) {
                        return;
                    }

                    //Get the user's guessed number and check if it was correct or not
                    var guessedNumber = $currInputField.val();
                    var checkedOutputArray = controller.checkGuessedNumber(guessedNumber);

                    //Disable current input field
                    $currInputField.prop("disabled", true);

                    //Check if user guessed the number or not
                    if(checkedOutputArray[0] === 4) {
                        view.showGameFinished("succeeded");
                    }
                    else if(controller.getLastGuessCounter() === 20) {
                        view.showGameFinished("failed");
                    }
                    else if(checkedOutputArray[0] !== 4 && controller.getLastGuessCounter() < 20) {
                        view.updateBoard();
                    }
                }
            });
        },

        //Initialize the game
        initializeGame: function() {
            controller.generateNewNumber();
            controller.setLastGuessCounter(1);
            $("input[id^='guess']").val("0000");
            $("input[id^='guess']").prop("disabled", true);
            $("#guess" + controller.getLastGuessCounter()).prop("disabled", false);
            view.showBoard();
        },

        //Show the board
        showBoard: function() {
            $(".how-to-play-descp").hide()
            $(".game-finish-dialog").hide();
            $("#container").show()
            $("#guess" + controller.getLastGuessCounter()).prop("disabled", false);
            $("#guess" + controller.getLastGuessCounter()).focus();
        },

        //Show the help
        showHelp: function() {
            $("#container").hide()
            $(".game-finish-dialog").hide();
            $(".how-to-play-descp").show()
        },

        //Update the board
        updateBoard: function() {
            controller.setLastGuessCounter(controller.getLastGuessCounter() + 1);
            this.showBoard();
        },

        //Show game finished message
        showGameFinished: function(message) {
            $("#container").hide()
            $(".game-result-string").text(message);
            $(".game-number").text(controller.getNumber());
            $(".game-finish-dialog").show();
        }
    };

    //When document is ready, start the magic
    $(document).ready(controller.init());

}(window.jQuery, window, document));
