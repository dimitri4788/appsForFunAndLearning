(function($, window, document) {
    //This function automatically slides memes
    var musicPlayer = {
        audioElement1: "",
        audioElement2: "",
        audioElement3: "",
        audioElement4: "",
        audioElement5: "",
        currAudioElement: "",

        //Initiate a new music player
        init: function() {
            //Initialize audio elements
            this.audioElement1 = document.createElement("audio");
            this.audioElement2 = document.createElement("audio");
            this.audioElement3 = document.createElement("audio");
            this.audioElement4 = document.createElement("audio");
            this.audioElement5 = document.createElement("audio");
            this.audioElement1.setAttribute("src", "resources/audio/jingle-bell-piano_1.mp3");
            this.audioElement2.setAttribute("src", "resources/audio/deck-the-halls_2.mp3");
            this.audioElement3.setAttribute("src", "resources/audio/joy-to-the-world_3.mp3");
            this.audioElement4.setAttribute("src", "resources/audio/carol-of-the-bells_4.mp3");
            this.audioElement5.setAttribute("src", "resources/audio/we-wish-you-a-merry-christmas_5.mp3");

            //Set audioElement1 as the default element
            this.currAudioElement = this.audioElement1;
        },

        //Get all audio elements
        getAllAudioElements: function() {
            return [this.audioElement1, this.audioElement2, this.audioElement3, this.audioElement4, this.audioElement5];
        },

        //Get current audio element
        getCurrAudioElement: function(element) {
            return this.currAudioElement;
        },

        //Set current audio element
        setCurrAudioElement: function(element) {
            this.currAudioElement = element;
        },

        //Play the current audio
        playMusic: function() {
            this.currAudioElement.play();
        },

        //Pause the current audio
        pauseMusic: function() {
            this.currAudioElement.pause();
        }
    };

    //This function automatically slides memes
    function memeSlider() {
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

    //Magic starts here
    function main() {
        //Initiate a new music player
        musicPlayer.init();

        //Play current audio file
        musicPlayer.playMusic();

        //Create button click event handlers to play music
        $("#button-one").click(function() {
            $(":button").removeClass("button-default");
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement1);
            musicPlayer.playMusic();
        });
        $("#button-two").click(function() {
            $(":button").removeClass("button-default");
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement2);
            musicPlayer.playMusic();
        });
        $("#button-three").click(function() {
            $(":button").removeClass("button-default");
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement3);
            musicPlayer.playMusic();
        });
        $("#button-four").click(function() {
            $(":button").removeClass("button-default");
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement4);
            musicPlayer.playMusic();
        });
        $("#button-five").click(function() {
            $(":button").removeClass("button-default");
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement5);
            musicPlayer.playMusic();
        });

        //Call the memes slider
        memeSlider();
    }

    //When document is ready, start the magic
    $(document).ready(main());

}(window.jQuery, window, document));
