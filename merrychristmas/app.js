(function($, window, document) {
    //This function automatically slides memes
    function MusicPlayer() {
        //Set initial MusicPlayer audio properties
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
    }

    //This method gets all the audio properties of MusicPlayer
    MusicPlayer.prototype.getAllAudioElements = function() {
        return [this.audioElement1, this.audioElement2, this.audioElement3, this.audioElement4, this.audioElement5];
    }

    //This method gets current audio element
    MusicPlayer.prototype.getCurrAudioElement = function(element) {
        return this.currAudioElement;
    }

    //This method sets current audio element
    MusicPlayer.prototype.setCurrAudioElement = function(element) {
        this.currAudioElement = element;
    }

    //This method plays the audio
    MusicPlayer.prototype.playMusic = function() {
        this.currAudioElement.play();
    }

    //This method pauses the current audio
    MusicPlayer.prototype.pauseMusic = function() {
        this.currAudioElement.pause();
    }

    //This function automatically slides memes
    function MemeSlider() {
        //Set initial MemeSlider properties
        this.currMemeIndex = 0;
        this.allMemesDivs = $(".meme-slider div");
        this.numOfMemes = this.allMemesDivs.length;
    }

    MemeSlider.prototype.startMemeSlider = function() {
        //Automatically rotate between the memes every 3 seconds
        var that = this;
        setInterval(function() {
            //3 seconds are over, show the next meme
            that.currMemeIndex += 1;
            if(that.currMemeIndex > (that.numOfMemes - 1)) {
                that.currMemeIndex = 0;
            }

            //Get the current meme div
            var currMemeDiv = $(".meme-slider div").eq(that.currMemeIndex);

            //Hide all the memes divs
            that.allMemesDivs.hide();

            //Display the current meme
            currMemeDiv.css("display", "inline-block");
        }, 3000);
    }

    //Remove the class "button-default" from all the buttons
    function removeClassButtonDefaultClass() {
        $(":button").removeClass("button-default");
    }

    //Magic starts here
    function main() {
        //Create a new MusicPlayer object
        var musicPlayer = new MusicPlayer();

        //Play current audio file
        musicPlayer.playMusic();

        //Create button click event handlers to play music
        $("#button-one").click(function() {
            removeClassButtonDefaultClass();
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement1);
            musicPlayer.playMusic();
        });
        $("#button-two").click(function() {
            removeClassButtonDefaultClass();
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement2);
            musicPlayer.playMusic();
        });
        $("#button-three").click(function() {
            removeClassButtonDefaultClass();
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement3);
            musicPlayer.playMusic();
        });
        $("#button-four").click(function() {
            removeClassButtonDefaultClass();
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement4);
            musicPlayer.playMusic();
        });
        $("#button-five").click(function() {
            removeClassButtonDefaultClass();
            $(this).addClass("button-default");
            musicPlayer.pauseMusic();
            musicPlayer.setCurrAudioElement(musicPlayer.audioElement5);
            musicPlayer.playMusic();
        });

        //Create a new MemeSlider object
        var memeSlider = new MemeSlider();
        memeSlider.startMemeSlider();

        //Start the snow-fall
        startSnowfall();
    }

    //When document is ready, start the magic
    $(document).ready(main());

}(window.jQuery, window, document));
