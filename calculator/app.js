//Operation object
var Operation = {
    //Public method
    perform: function(left, right, operation) {
        //Convert string values to float
        var first = parseFloat(left);
        var second = parseFloat(right);
        switch(operation) {
            case "+":
                return this.add(first, second);
                break;
            case "-":
                return this.subtract(first, second);
                break;
            case "*":
                return this.multiply(first, second);
                break;
            case "/":
                return this.divide(first, second);
                break;
        }
    },

    //Internal methods
    add: function(left, right) {
        return left + right;
    },
    subtract: function(left, right) {
        return left - right;
    },
    multiply: function(left, right) {
        return left * right;
    },
    divide: function(left, right) {
        return left / right;

    }
};

//Screen object
var Screen = {
    //Update the screen
    insert: function(value) {
        $("#output").append(value);
    },

    //Clear the screen
    clear: function() {
        $("#output").text("");
    }
};

//Calculator object
var Calculator = {
    operands: [],
    operators: [],
    operandMemory: "",

    //Store digit, decimal or operator pressed
    storeValue: function(value) {
        //Update screen
        Screen.insert(value);

        //Store the operator and operand
        if(["+", "-", "*", "/"].includes(value) && this.operandMemory !== "") {
            this.operands.push(this.operandMemory);
            this.operators.push(value);
            this.operandMemory = "";
        }
        else {
            //Keep appending digits and a decimal as long as the user is pressing it
            this.operandMemory += value;
        }
    },

    //Calculate the result of arithematic operation
    calculateResult: function() {
        //Store the last value saved in operandMemory
        if(this.operandMemory !== "") {
            this.operands.push(this.operandMemory);
        }

        //Perform the arithematic operation
        for(var i = 0; i < this.operators.length; i++) {
            var result = Operation.perform(this.operands.shift(), this.operands.shift(), this.operators[i]);
            result = result.toFixed(2);
        }

        //Clear the screen and display the result
        Screen.clear();
        Screen.insert(result);

        //Clear the arrays and store result into operandMemory
        this.operands = [];
        this.operators = [];
        this.operandMemory = result;
    },

    //Reset calculator
    reset: function() {
        this.operands = [];
        this.operators = [];
        this.operandMemory = "";
        Screen.clear();
    }
};

function main() {
    $(".digit, #decimal, .operator").click(function() { Calculator.storeValue($(this).text()); });
    $("#equal").click(function() { Calculator.calculateResult(); });
    $("#clear").click(function() { Calculator.reset(); });
}

$(document).ready(main());
