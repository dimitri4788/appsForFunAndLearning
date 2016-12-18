//This functions initializes the board
var initializeBoard = function initializeBoard() {
    var numberOfInputFields = 20;
    var innerElement;

    var $inputTable = $(".inner-input-table");
    for(var i = 1; i <= numberOfInputFields; i++) {
        innerElement = '<tr><td><input id="guess'+i+'" type="text" value="0000" maxlength="4" pattern="[0-9]{4}" required disabled><div class="out-white"></div><div class="out-white"></div><div class="out-white"></div><div class="out-white"></div></td></tr>';
        $inputTable.append(innerElement);
    }
};

//Magic starts here
function main() {
    initializeBoard();
}

$(document).ready(main());
