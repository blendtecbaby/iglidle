document.getElementById("brickButton").style.visibility='hidden'


var gameData = {
    snow: 0,
    snowPerClick: 1,
    snowBrick:0,
    snowPerBrick: 4,
    brickTime:  2,
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

}

function makeBrick() {
    if (gameData.snow >= gameData.snowPerBrick) {
        //disable button
        document.getElementById("brickButton").disabled = true;
        const loadingBar = document.getElementById("brickBar");
        loadingBar.style.display = 'block';
        loadingBar.value = 0;
        let progress = 0;
        const interval = setInterval(function() {
            progress += gameData.brickTime; // Increase the progress by 2 every 100ms (for 5 seconds)
            loadingBar.value = progress;

            // When the progress reaches 100, complete the process
            if (progress >= 100) {
                clearInterval(interval);

                // Deduct snow and add a snow brick
                gameData.snow -= gameData.snowPerBrick;
                gameData.snowBrick += 1;
                updateCount();

                // Hide the loading bar and re-enable the button
                loadingBar.style.display = 'none';
                document.getElementById("brickButton").disabled = false;
            }
        }, 100); // Update every 100ms
    }
}