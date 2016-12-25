//Magic starts here
function main() {
    var currMemeIndex = 0,
    allMemesDivs = $(".meme-slider div"),
    numOfMemes = allMemesDivs.length;

    function showMeme() {
        //Get the current meme div
        var currMemeDiv = $(".meme-slider div").eq(currMemeIndex);

        //Hide all the memes divs
        allMemesDivs.hide();

        //Display the current meme
        currMemeDiv.css("display","inline-block");
    }

    //Automatically rotate between the memes every 3 seconds
    setInterval(function() {
        currMemeIndex += 1;
        if(currMemeIndex > (numOfMemes - 1)) {
            currMemeIndex = 0;
        }

        //3 seconds are over, show the next meme
        showMeme();
    }, 3000);
}

$(document).ready(main());
