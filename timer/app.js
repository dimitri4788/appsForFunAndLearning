//Utility function; isNaN() has issues so we will write our own
function isNotANumber(num) {
    return num !== num;
}

//Timer object
var timer = {
    countState: false,

    //The function starts the count-down
    start: function() {
        //Get the minutes and seconds entered as inputs
        var timeInSeconds = (isNotANumber(parseInt($("#mins").text(), 10)*60) ? 0 : parseInt($("#mins").text(), 10)*60) +
                            (isNotANumber(parseInt($("#secs").text(), 10)) ? 0 : parseInt($("#secs").text(), 10));

        //Make sure the minutes and/or seconds are entered, else show error message
        if(timeInSeconds === 0) {
            $('#mins').text("0");
            $('#secs').text("0");
            $("#errorMessage").show();
            return;
        }

        //Change the button to Pause
        $('#start').css('background-color','#34495e').val('Pause'); //jQuery method chaining

        //Start the count down from the number of seconds (min*60 + sec) entered by the user
        this.countState = true;
        timeoutID = setInterval(function() {
            $('#mins').text(Math.floor(timeInSeconds/60));
            $('#secs').text(Math.floor(timeInSeconds%60));
            timeInSeconds = timeInSeconds - 1;
            if(timeInSeconds < 0) {
                clearInterval(timeoutID);

                //Change the button back to Start
                $('#start').css('background-color','#4DAF7C').val('Start');
            }
        }, 1000);
    },

    //This function pauses the count-down
    pause: function() {
        clearInterval(timeoutID);
        this.countState = false;

        //Change the button to Start
        $('#start').css('background-color','#4DAF7C').val('Start');
    },

    //This function stops the count-down
    stop: function() {
        //Cancel the timer which was previously established by a call to setInterval
        if(this.countState) {
            clearInterval(timeoutID);
            this.countState = false;

            //Change the button to Start
            $('#start').css('background-color','#4DAF7C').val('Start');
        }

        //Make the notes box empty again
        $('#mins').text("0");
        $('#secs').text("0");
    }
};

function createInputField() {
    return function() {
        $(this).html(
            $('<input>')
            .attr('type','text')
            .attr('size','2')
            .attr('maxlength','2')
            .attr('class','inputNumber')
            .val($(this).text())
        );

        //Put focus on this newly created input element
        $('input', this).focus();

        //This blur code executes when input element loses focus (such has by clicking on somwhere else on the document)
        $('input', this).blur(function() {
            var val = $(this).val();
            //Insert the entered value after this input element, then remove the input element and
            //  unbind event handlers from it. We can use jQuery chaining also here: $(this).after(...).remove().unbind()
            $(this).after(isNotANumber(parseInt(val)) ? 0 : parseInt(val));
            $(this).remove();
            $(this).unbind();
        });
    }
}

function main() {
    $("#start").click(function() { timer.countState ? timer.pause() : timer.start(); });
    $("#stop").click(function() { timer.stop(); });
    $(".timer").click(createInputField());
}

$(document).ready(main());
