(function($, window, document) {
    var model = {
        number: "",
        lastGuessCounter: 0,
        gameState: "" /* going or done */
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

        //Returns the game state
        getGameState: function() {
            return model.gameState;
        },

        //Generate random number
        generateNewNumber: function() {
            model.number = (Math.random()).toString().slice(2,6);
        },

        //Returns the last guess counter from the model
        setLastGuessCounter: function(counter) {
            model.lastGuessCounter = counter;
        },

        //Returns the last guess counter from the model
        setGameState: function(state) {
            model.gameState = state;
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

            //Loop over again to check for the correct numbers that are at incorrect position
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
        output: [],

        //Initialize the view
        init: function() {
            this.initializeGame();

            //Handle how to play help click event
            $(".how-to-play").click(function() {
                view.showHelp();
            });

            //Handle resume click event
            $(".resume-game").click(function() {
                if(controller.getLastGuessCounter() === 20 || (controller.getGameState() === "done")) {
                    view.initializeGame();
                }
                view.showBoard();
            });

            //Handle reset game click event
            $(".reset-game").click(function() {
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
                    view.output = controller.checkGuessedNumber(guessedNumber);

                    //Disable current input field
                    $currInputField.prop("disabled", true);

                    //Check if user guessed the number or not
                    if(view.output[0] === 4) {
                        controller.setGameState("done");
                        view.showGameFinished("succeeded");
                    }
                    else if(controller.getLastGuessCounter() === 20) {
                        view.showGameFinished("failed");
                    }
                    else if(view.output[0] !== 4 && controller.getLastGuessCounter() < 20) {
                        view.updateBoard();
                    }
                }
            });
        },

        //Initialize the game
        initializeGame: function() {
            controller.generateNewNumber();
            controller.setLastGuessCounter(1);
            controller.setGameState("going");
            $("input[id^='guess']").val("0000");
            $("input[id^='guess']").prop("disabled", true);
            $("form[id^='user-guess']" + " span").removeClass(function(index, css) {
                return (css.match(/\out-\S+/g) || []).join(' ');
            });
            $("form[id^='user-guess']" + " span").addClass("out-white");
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

        //Show color codes (guess feedback) on board
        showGuessFeedback: function() {
            var green = view.output[0];
            var red = view.output[1];

            //The form's span children are numbered: 2, 3, 4, and 5, since the first child is the input element
            var i = 2;
            while(green) {
                var nthSpanChildOfForm = $("#user-guess" + controller.getLastGuessCounter() + " span:nth-child(" + i + ")");
                nthSpanChildOfForm.removeClass("out-white");
                nthSpanChildOfForm.addClass("out-green");
                i += 1;
                green -= 1;
            }

            while(red) {
                nthSpanChildOfForm = $("#user-guess" + controller.getLastGuessCounter() + " span:nth-child(" + i + ")");
                nthSpanChildOfForm.removeClass("out-white");
                nthSpanChildOfForm.addClass("out-red");
                i += 1;
                red -= 1;
            }
        },

        //Update the board
        updateBoard: function() {
            view.showGuessFeedback();
            controller.setLastGuessCounter(controller.getLastGuessCounter() + 1);
            this.showBoard();
        },

        //Show game finished message
        showGameFinished: function(message) {
            view.showGuessFeedback();
            $("#container").hide()
            $(".game-result-string").text(message);
            $(".game-number").text(controller.getNumber());
            $(".game-finish-dialog").show();
        }
    };

    //When document is ready, start the magic
    $(document).ready(controller.init());

}(window.jQuery, window, document));
