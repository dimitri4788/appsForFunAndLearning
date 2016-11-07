//Timer object
var timer = {
    countState: false,

    //The function starts the count-down
    start: function() {
        //Get the minutes and seconds entered as inputs
        var timeInSeconds = (isNaN(parseInt($("#mins").text(), 10)*60) ? 0 : parseInt($("#mins").text(), 10)*60) +
                            (isNaN(parseInt($("#secs").text(), 10)) ? 0 : parseInt($("#secs").text(), 10));

        //Make sure the minutes and/or seconds are entered, else show error message
        if(timeInSeconds === 0) {
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

function main() {
    $(".timer").click(function() { $("#errorMessage").hide(); });
    $("#start").click(function() { timer.countState ? timer.pause() : timer.start(); });
    $("#stop").click(function() { timer.stop(); });
}

$(document).ready(main());
