let started = false;

let gamePattern = [];

let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

function nextSequence()
{
	userClickedPattern = [];
	level++;

	$("#level-title").text("Level " + level);

	let randomNumber = Math.floor(Math.random() * 3) + 1;

	let randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$(".btn").click(function(){
	let userChosenColour =  $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1);
});


function playSound(name)
{
	let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) 
{
	$("#"+currentColor).addClass("pressed");
	setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
	if (!started) 
	{
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

function checkAnswer(currentLevel)
{
	if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
	{
		if (userClickedPattern.length === gamePattern.length)
		{
	        setTimeout(function () {
	          nextSequence();
	        }, 1000);
        }
	}
	else
	{
		playSound("wrong");

		$("body").addClass("game-over");
		$("h1").text("Game Over, Press Any Key to Restart");
		setTimeout(function() {
	        $("body").removeClass("game-over");
	    }, 200);
	    
	    startOver();
	}
}

function startOver()
{
	level = 0;
	gamePattern = [];
	started = false;
}