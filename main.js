document.getElementById("brickButton").style.visibility='hidden'


var gameData = {
    snow: 0,
    snowPerClick: 1,
    snowBrick:0,
    snowPerBrick: 4,
    brickMax: 5,
    brickTime:  10,
}

function updateTicker(newText) {
    const ticker = document.getElementById('ticker');
    
    // Add new text at the bottom of the ticker
    ticker.innerHTML += newText + '\n';  // Add a new line after each message
    
    // Scroll to the bottom of the ticker to show the latest text
    ticker.scrollTop = ticker.scrollHeight;
  }


function updateCount(){
    if (gameData.snow >= 4){
    
        if (document.getElementById("brickButton").style.visibility == 'hidden')
        updateTicker("You can now make bricks.");
        document.getElementById("brickButton").style.visibility='visible';
    }

    document.getElementById("snowGrabbed").innerHTML = gameData.snow + "  Snowballs collected";
    document.getElementById("snowBricks").innerHTML = gameData.snowBrick + "  Bricks made";
}
ticker.innerHTML += "You are surrounded by snow." + '\n';

function grabSnow() {
    gameData.snow +=gameData.snowPerClick;
    updateCount();
    updateTicker("snow grabbed")
}

function makeBrick() {
    // Check if brick limit is reached
    if (gameData.snowBrick >= gameData.brickMax) {
        updateTicker("You only have room for " + gameData.brickMax + " bricks.");
        document.getElementById("brickButton").disabled = true; // Disable the button
        return;
    }

    // Check if there's enough snow to make a brick
    if (gameData.snow >= gameData.snowPerBrick) {
        // Disable button while brick-making process occurs
        document.getElementById("brickButton").disabled = true;

        const loadingBar = document.getElementById("brickBar");
        loadingBar.style.display = 'block';
        loadingBar.value = 0;

        let progress = 0;
        const interval = setInterval(function () {
            progress += gameData.brickTime; // Increase progress based on brickTime
            loadingBar.value = progress;

            if (progress >= 100) {
                clearInterval(interval);

                // Deduct snow and add a brick
                gameData.snow -= gameData.snowPerBrick;
                gameData.snowBrick += 1;
                updateCount();

                // Hide the loading bar
                loadingBar.style.display = 'none';

                // Re-enable the button if brick limit is not yet reached
                if (gameData.snowBrick < gameData.brickMax) {
                    document.getElementById("brickButton").disabled = false;
                } else {
                    updateTicker("You only have room for " + gameData.brickMax + " bricks.");
                }
            }
        }, 100); // Update every 100ms
    }
}