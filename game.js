// ----- SET UP DATA STRUCTURES AND VARIABLES ------

var gamePattern = []; 
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = []; 
var level = 0; 


// ------ FUNCTION DEFINITIONS ------
function nextSequence(){
    // make a random number and use it to choose a color 
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber]; 

    // add that random color to our sequence 
    gamePattern.push(randomColor);

    // animate the appropriate color 
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // add audio for the appropriate color whenever tapped 
    playSound(randomColor); 

   
    level++; 
    $("h1").text("Level " + level);

}


function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play(); 
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    } , 100);
    

}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success"); 
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                userClickedPattern = []; 
                nextSequence(); 
            } , 1000);
                
        
        }
    }
    else{
        console.log("wrong"); 
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $("body").addClass("game-over"); 
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver(); 
    }

    
}


function startOver(){
    level = 0; 
    gamePattern = []; 
    userClickedPattern = []; 
}

// ------ MAIN METHOD ---------

$(document).on("keypress", function(){
    if(level === 0){
        $("#level-title").text("Level" + level); 
        nextSequence();
    }
}); 


// event listener to see if a button has been clicked, trigger a callback function 
$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor); 
    playSound(userChosenColor);
    animatePress(userChosenColor);


    checkAnswer(userClickedPattern.length-1);

});

