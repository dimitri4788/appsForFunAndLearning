var timer = {
    countDownState: false,
    timeoutID: 0,

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

        //Start the count down from the number of seconds (min*60 + sec) entered by the user
        this.countDownState = true;
        this.timeoutID = setInterval(function() {
            $('#mins').text(timeInSeconds);
            $('#secs').text(timeInSeconds);
            timeInSeconds = timeInSeconds - 1;
            if(timeInSeconds < 0) {
                clearInterval(this.timeoutID);
            }
        }, 1000);
    },

    //This function stops the count-down
    stop: function() {
        //Cancel the timer which was previously established by a call to setInterval
        if(this.countDownState) {
            clearInterval(this.timeoutID);
        }

        //Make the notes box empty again
        $('#mins').text("0");
        $('#secs').text("0");
    }
};

function main() {
    $(".timer").click(function() { $("#errorMessage").hide(); });
    $("#start").click(function() { timer.start(); });
    $("#stop").click(function() { timer.stop(); });
}

$(document).ready(main());
