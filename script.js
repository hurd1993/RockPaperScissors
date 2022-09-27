//Global Variables

var score1 = document.getElementById("player1Score");
var score2 = document.getElementById("player2Score");
var canvas, canvas2, canvas3;
var ctx, ctx2, ctx3;
var width, height;
var spriteWidth = 380;
var spriteHeight = 380;
var scaleConst = 4;
var xPos = 150; 
var	yPos = 200;
var keys = [];
var player1 = {score: 0, playerHand: 0};
var player2 = {score: 0, playerHand: 0};




window.onload = init();

/*Call this function when opening or refreshing the site
	Score resets to 0;
	The Hands default to the "Rock" state
*/
function init() {
	newInterval = 0;
	canvas = document.getElementById("boxingRing");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	
	canvas2 = document.createElement("canvas");
	canvas2.width = spriteWidth;
	canvas2.height = spriteHeight;
	
	ctx2 = canvas2.getContext("2d");
	ctx2.strokeStyle = "#000000"; 
	ctx2.lineWidth = 1;
	
	canvas3 = document.createElement("canvas");
	canvas3.width = spriteWidth;
	canvas3.height = spriteHeight;
	
	ctx3 = canvas3.getContext("2d");
	ctx3.strokeStyle = "#000000"; 
	ctx3.lineWidth = 1;
	drawRing();
	drawRock(ctx2,scaleConst,scaleConst);
	drawRock(ctx3,-scaleConst,scaleConst);
	ctx.drawImage(canvas2,xPos,yPos);
	ctx.drawImage(canvas3,width-(xPos+spriteWidth),yPos);
	
	document.addEventListener('keypress', keyPressFunction);
	
}
/*The function to call whenever a key is pressed
*/
function keyPressFunction() {
	var keyName = event.key;
		if(keyNotValid(event.keyCode)) {
			alert("Please Press a Valid Key");
		}
		
		else {
			keys.push(keyName);
		}
		
		if(keyIsDuplicate(keys) || keys.length > 2) {
			keys.pop();
			alert("Only your first choice counts!");
		}
		//What happens when second key is pressed
		if(keys.length === 2) {	
			animateHands(displayHands);
			
		}
}
/*Displays the Player's hands after the animation ends*/	
function displayHands() {
	document.addEventListener('keypress', keyPressFunction);
	assignHands(keys);
	var winner = compareHands(player1.playerHand,player2.playerHand);	
	switch(winner) {
			case 1:
				player1.score++;
				break;
			case 2:
				player2.score++;
			}
	update(updateHands);
	
	
}	
/* Checks wheather a key pressed has the value of 1,2,3,7,8 or 9
@param key The key to check
@return True if the key is not valid, flase otherwise
*/
function keyNotValid(key) {
	
		if(key < 49 || key > 57) {
			return true;
		}
		if(key > 51 && key < 55) {
			return true;
		}
		
	return false;
		
}
/* Checks wheather a player chose a hand twice (I.e. Player chose 1 for "Rock" then immidiately chose 2 for "Paper")
@param key The key array to check
@return True if the key is a second player choice, flase otherwise
*/
function keyIsDuplicate(key) {
	if(Math.abs(key[0] - key[1]) <= 2) {
		return true;
	}
	return false;
}
/*Assign the keys from the array to the appropriate player: 
Player1 values are 1-3/ Player 2 Valyes are 7-8.
@param theKeys The key array to assign
*/
function assignHands(theKeys) {
	for(var i = 0; i < theKeys.length; i++) {
		if(theKeys[i] >= 1 && theKeys[i] <= 3) {
			player1.playerHand = theKeys[i];
		}
		if(theKeys[i] >= 7 && theKeys[i] <= 9) {
			player2.playerHand = theKeys[i];
		}
	}
	
}
/*Compares both players hands and determines the winner
@param hand1,hand2 The hands to compare
@return 0 A tie, 1 Player1 Wins, 2 Player 2 Wins 
*/
function compareHands(hand1,hand2) {
	if(Math.abs(hand1 - hand2) === 6) {
		return 0;
	}
	if(Math.abs(hand1 - hand2) === 8 || Math.abs(hand1 - hand2) === 5) {
		return 1;
	}
	if(Math.abs(hand1 - hand2) === 4 || Math.abs(hand1 - hand2) === 7) {
		return 2;
	}
}
/*Updates the players hands to the position they previously chose and updates the score*/
function update(callback) {
	keys = [];
	score1.innerHTML = "Player 1 Wins: " + player1.score;
	score2.innerHTML = "Player 2 Wins: " + player2.score;
	callback(results);
	
}
/*Displays the final results of the game*/
function results() {
	if(player1.score === 5) {
			alert("Player 1 is the Ultimate Champion!");
			reset();
		}
		if(player2.score === 5) {
			alert("Player 2 is the Ultimate Champion!");
			reset();
		}	
}
/*Returns the players hands to "Rock" and resets the score*/
function reset() {
	keys = [];
	player1.score = 0;
	player2.score = 0;
	score1.innerHTML = "Player 1 Wins: " + player1.score;
	score2.innerHTML = "Player 2 Wins: " + player2.score;
	clear();
	drawRock(ctx2,scaleConst,scaleConst);
	drawRock(ctx3,-scaleConst,scaleConst);
	ctx.drawImage(canvas2,xPos,yPos);
	ctx.drawImage(canvas3,width-(xPos+spriteWidth),yPos);
	
}
/*Changes the Player Hand state based off the Player Hand hand
*/
function updateHands(callback) {
	clear();
	switch(player1.playerHand) {
		case "1":
			drawRock(ctx2,scaleConst,scaleConst);
			break;
		case "2":
			drawPaper(ctx2,scaleConst,scaleConst);
			break;
		case "3":
			drawScissor(ctx2,scaleConst,scaleConst);
	}
	switch(player2.playerHand) {
		case "7":
			drawRock(ctx3,-scaleConst,scaleConst);
			break;
		case "8":
			drawPaper(ctx3,-scaleConst,scaleConst);
			break;
		case "9":
			drawScissor(ctx3,-scaleConst,scaleConst);
	}
	ctx.drawImage(canvas2,xPos,yPos);
	ctx.drawImage(canvas3,width-(xPos+spriteWidth),yPos);
	setTimeout(callback,500);
}


/*Draws the "Rock" hand in the appropriate canvas element
@param context The canvas context to draw in
@param xScale The x scaling factor
@param yScale The y scaling factor
*/
function drawRock(context,xScale,yScale) {
	context.clearRect(0,0,spriteWidth, spriteHeight);
	context.save();
	
	if(xScale < 0) {
		context.translate(spriteWidth, 0);
	}

	context.scale(xScale,yScale);
	
	//Draw the gloved fingers
	context.fillStyle = "#696c6f";
	context.moveTo(25,19);
	context.lineTo(35,10);
	context.lineTo(40,17);
	context.fill();
	context.stroke();
	
	context.moveTo(49,20);
	context.lineTo(60,20);
	context.lineTo(60,27);
	context.lineTo(48,27);
	context.fill();
	context.stroke();
	
	context.moveTo(48,27);
	context.lineTo(60,27);
	context.lineTo(60,34);
	context.lineTo(48,34);
	context.fill();
	context.stroke();
	
	context.moveTo(48,34);
	context.lineTo(60,34);
	context.lineTo(60,41);
	context.lineTo(47,41);
	context.fill();
	context.stroke();
	
	context.moveTo(47,41);
	context.lineTo(60,41);
	context.lineTo(60,48);
	context.lineTo(46,48);
	context.fill();
	context.stroke();
	
	//Draws the Glove Shape
	context.beginPath();
	context.fillStyle = "#3b3d3e";
	context.moveTo(20,20);
	context.lineTo(20,50);
	context.lineTo(45,55);
	context.lineTo(50,15);
	context.closePath();
	context.fill();
	context.stroke();
	if(xScale < 0) {
		context.fillStyle = "#d40a0a";
	}
	else {
	context.fillStyle = "#1d588a";
	}
	context.beginPath();
	context.moveTo(20,25);
	context.lineTo(20,45);
	context.lineTo(40,50);
	context.lineTo(45,20);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}
/*Draws the "Paper" hand in the appropriate canvas element
@param context The canvas context to draw in
@param xScale The x scaling factor
@param yScale The y scaling factor
*/
function drawPaper(context,xScale,yScale) {
	context.clearRect(0,0,spriteWidth, spriteHeight);
	context.save();
	if(xScale < 0) {
		context.translate(spriteWidth, 0);
	}
	
	context.scale(xScale,yScale);
	//Draw fingers
	context.fillStyle = "#f8dbbb";
	context.moveTo(35,10);
	context.lineTo(41,5);
	context.lineTo(46,12);
	context.lineTo(40,17);
	context.fill();
	context.stroke();

	context.moveTo(60,20);
	context.lineTo(70,20);
	context.lineTo(70,27);
	context.lineTo(60,27);
	context.fill();
	context.stroke();
	
	context.moveTo(60,27);
	context.lineTo(75,27);
	context.lineTo(75,34);
	context.lineTo(60,34);
	context.fill();
	context.stroke();
	
	context.moveTo(60,34);
	context.lineTo(73,34);
	context.lineTo(73,41);
	context.lineTo(60,41);
	context.fill();
	context.stroke();
	
	context.moveTo(60,41);
	context.lineTo(68,41);
	context.lineTo(68,48);
	context.lineTo(60,48);
	context.fill();
	context.stroke();
	
	//Draw the gloved fingers
	context.beginPath();
	context.fillStyle = "#696c6f";
	context.moveTo(25,19);
	context.lineTo(35,10);
	context.lineTo(40,17);
	context.fill();
	context.stroke();
	
	context.beginPath();
	context.moveTo(49,20);
	context.lineTo(60,20);
	context.lineTo(60,27);
	context.lineTo(48,27);
	context.fill();
	context.stroke();
	
	context.beginPath();
	context.moveTo(48,27);
	context.lineTo(60,27);
	context.lineTo(60,34);
	context.lineTo(48,34);
	context.fill();
	context.stroke();
	
	context.beginPath();
	context.moveTo(48,34);
	context.lineTo(60,34);
	context.lineTo(60,41);
	context.lineTo(47,41);
	context.fill();
	context.stroke();
	
	context.beginPath();
	context.moveTo(47,41);
	context.lineTo(60,41);
	context.lineTo(60,48);
	context.lineTo(46,48);
	context.fill();
	context.stroke();
	
	//Draws the Glove Shape
	context.beginPath();
	context.fillStyle = "#3b3d3e";
	context.moveTo(20,20);
	context.lineTo(20,50);
	context.lineTo(45,55);
	context.lineTo(50,15);
	context.closePath();
	context.fill();
	context.stroke();
	if(xScale < 0) {
		context.fillStyle = "#d40a0a";
	}
	else {
	context.fillStyle = "#1d588a";
	}
	context.beginPath();
	context.moveTo(20,25);
	context.lineTo(20,45);
	context.lineTo(40,50);
	context.lineTo(45,20);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}

/*Draws the "Scissor" hand in the appropriate canvas element
@param context The canvas context to draw in
@param xScale The x scaling factor
@param yScale The y scaling factor
*/
function drawScissor(context,xScale,yScale) {
	context.clearRect(0,0,spriteWidth, spriteHeight);
	context.save();
	if(xScale < 0) {
		context.translate(spriteWidth, 0);
	}
	
	context.scale(xScale,yScale);
	
	//Draw fingers
	context.fillStyle = "#f8dbbb";
	context.moveTo(56,12);
	context.lineTo(64,6);
	context.lineTo(68,12);
	context.lineTo(60,18);
	context.fill();
	context.stroke();
	
	context.moveTo(60,27);
	context.lineTo(75,27);
	context.lineTo(75,34);
	context.lineTo(60,34);
	context.fill();
	context.stroke();
	
	//Draw the gloved fingers
	context.beginPath();
	context.fillStyle = "#696c6f";
	context.moveTo(25,19);
	context.lineTo(35,10);
	context.lineTo(40,17);
	context.fill();
	context.stroke();
	
	context.moveTo(49,17);
	context.lineTo(56,12);
	context.lineTo(60,18);
	context.lineTo(48,27);
	context.fill();
	context.stroke();
	
	context.moveTo(48,27);
	context.lineTo(60,27);
	context.lineTo(60,34);
	context.lineTo(48,34);
	context.fill();
	context.stroke();
	
	context.moveTo(48,34);
	context.lineTo(60,34);
	context.lineTo(60,41);
	context.lineTo(47,41);
	context.fill();
	context.stroke();
	
	context.moveTo(47,41);
	context.lineTo(60,41);
	context.lineTo(60,48);
	context.lineTo(46,48);
	context.fill();
	context.stroke();
	
	//Draws the Glove Shape
	context.beginPath();
	context.fillStyle = "#3b3d3e";
	context.moveTo(20,20);
	context.lineTo(20,50);
	context.lineTo(45,55);
	context.lineTo(50,15);
	context.closePath();
	context.fill();
	context.stroke();
	if(xScale < 0) {
		context.fillStyle = "#d40a0a";
	}
	else {
	context.fillStyle = "#1d588a";
	}
	context.beginPath();
	context.moveTo(20,25);
	context.lineTo(20,45);
	context.lineTo(40,50);
	context.lineTo(45,20);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}

/*Draws the boxing ring for the hands to fight in
*/
function drawRing() {	
	//Main Platform
	ctx.beginPath();
	ctx.fillStyle ="#c8c9c9";
	ctx.moveTo(0,height);
	ctx.lineTo(200,200);
	ctx.lineTo(width-200,200);
	ctx.lineTo(width,height);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	//Ropes
	ctx.beginPath();
	ctx.moveTo(0,height-100);
	ctx.lineTo(200,150);
	ctx.lineTo(width-200,150);
	ctx.lineTo(width,height-100);
	ctx.moveTo(0,height-150);
	ctx.lineTo(200,100);
	ctx.lineTo(width-200,100);
	ctx.lineTo(width,height-150);
	ctx.stroke();
	ctx.closePath();
	//Corners
	ctx.fillStyle = "#1d588a";
	ctx.beginPath();
	ctx.moveTo(190,215);
	ctx.lineTo(210,220);
	ctx.lineTo(210,80);
	ctx.lineTo(190,75);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(210,220);
	ctx.lineTo(225,200);
	ctx.lineTo(225,60);
	ctx.lineTo(210,80);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(190,75);
	ctx.lineTo(210,55);
	ctx.lineTo(225,60);
	ctx.lineTo(210,80);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "#d40a0a";
	ctx.beginPath();
	ctx.moveTo(width-190,215);
	ctx.lineTo(width-210,220);
	ctx.lineTo(width-210,80);
	ctx.lineTo(width-190,75);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(width-210,220);
	ctx.lineTo(width-225,200);
	ctx.lineTo(width-225,60);
	ctx.lineTo(width-210,80);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(width-190,75);
	ctx.lineTo(width-210,55);
	ctx.lineTo(width-225,60);
	ctx.lineTo(width-210,80);
	ctx.fill();
	ctx.stroke();
	
}
/*Clears the canvas and redraws the boxing ring.
*/
function clear() {
	ctx.clearRect(0,0,width,height);
	drawRing();
}

/*Sets the hands to the "Rock" positions and perfrom a "1, 2, Shoot!" animation
@param callback The function to call once the animation is over
*/
function animateHands(callback) {
  var moveingUp = true;
  var pos = 0;
  var count = 0;
  var id = setInterval(frame, 1);
  function frame() {
	  document.removeEventListener('keypress',keyPressFunction);
	  if(pos > 150 || pos < 0) {
		  moveingUp = !moveingUp;
		  count++;
	  }
	  
	  if(moveingUp) {
		pos+=5;
		clear();
		drawRock(ctx2,scaleConst,scaleConst);
		drawRock(ctx3,-scaleConst,scaleConst);
		ctx.drawImage(canvas2,xPos,yPos-pos);
		ctx.drawImage(canvas3,width-(xPos+spriteWidth),yPos-pos);
	  }
	  if(!moveingUp) {
		pos-=5;
		clear();
		drawRock(ctx2,scaleConst,scaleConst);
		drawRock(ctx3,-scaleConst,scaleConst);
		ctx.drawImage(canvas2,xPos,yPos-pos);
		ctx.drawImage(canvas3,width-(xPos+spriteWidth),yPos-pos);  
	  }
	  if (count === 6) {
		  clearInterval(id);
		  callback();
		 	 
	  }
	  
  }
}


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	