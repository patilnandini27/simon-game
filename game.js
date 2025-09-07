var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern = [];   //for resetting pattern for new level


// for first key press
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence(); //starts the game
        started = true;
    }
});

  // handler function

$(".btn").click(function(){
    userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour); //adds to array


    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); //index of last answer
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    }
    
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        // call startover() if the user get sequence wrong.
        startOver();
    }


}

function nextSequence(){
    
    userClickedPattern = [];

    level++;   //increase level by 1
     $("#level-title").text("Level "+ level);
    
    

    // generate random color
    var randomNumber = Math.floor(Math.random()*4);

    //select random numbered color from the array
    var randomChosenColour = buttonColours[randomNumber];
    
    //saving the sequence of colors generated so far
    gamePattern.push(randomChosenColour);

    // animation
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    

}

function playSound(name){    
    // play sound
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    // select button and class
    $("#"+ currentColour).addClass("pressed");

    // after 100 ms remove the class
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
   
}

 

function startOver(){
    level = 0;
    gamePattern =[];
    started = false;

}
