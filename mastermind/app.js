//This functions initializes the board
var initializeBoard = function initializeBoard() {
    var numberOfInputFields = 15;
    var innerElement;

    var $inputTable = $(".inner-input-table");
    for(var i = 1; i <= numberOfInputFields; i++) {
        innerElement = '<tr><td><input id="guess'+i+'" type="text" value="0000" maxlength="4" pattern="[0-9]{4}" required disabled><span class="out-white">&nbsp;</span><span class="out-white">&nbsp;</span><span class="out-white">&nbsp;</span><span class="out-white">&nbsp;</span></td></tr>';
        $inputTable.append(innerElement);
    }
};

var startTheGame = function startTheGame() {

};

//Magic starts here
function main() {
    initializeBoard();

    startTheGame();
}

$(document).ready(main());
