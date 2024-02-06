const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let isFirstTime = true;

document
    .querySelectorAll("#button-container .btn").forEach(button => {
        button.addEventListener("click", function (e) {
            if (!started) {
                return;
            }
            playSound(e.target.id);
            let userChosenColour = e.target.id;
            userClickedPattern.push(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length - 1);
        })
    });

document.addEventListener("keydown", (e) => {
    if (e.key === "s") {
        isFirstTime = false;
        startGame();
    }

    if (!isFirstTime && e.key === "r") {
        startGame();
    }
});

function startGame() {
    if (!started) {
        nextSequence();
        started = true;
    }
}

function animatePress(currentColour) {
    document.getElementById(currentColour).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(currentColour).classList.remove("pressed");
    }, 100);
} 

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = `Level ${level}`;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    fadeInOut(document.getElementById(randomChosenColour), 2000);
}

function playSound(name) {
    document.getElementById(`${name}-sound`).play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 300);
        document.querySelector("#level-title").textContent = "Game Over, Press r Key to Restart";
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function fadeInOut(element, duration) {
    // Fade in
    element.style.opacity = 0;
    var fadeInInterval = setInterval(function () {
        element.style.opacity += 1;
        if (element.style.opacity >= 1) {
            clearInterval(fadeInInterval);
            // Fade out
            var fadeOutInterval = setInterval(function () {
                element.style.opacity -= 1;
                if (element.style.opacity <= 0) {
                    clearInterval(fadeOutInterval);
                    // Reset opacity for next fadeIn
                    element.style.opacity = 1;
                }
            }, duration / 10);
        }
    }, duration / 10);
}
