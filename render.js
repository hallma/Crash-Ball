function platform(divId, frameWidth, frameHeight) {
	var canvas = document.getElementById(divId);
	canvas.width = frameWidth;
	canvas.height = frameHeight;
	var ctx = canvas.getContext("2d");
	var rectWidth = 100;
	var rectHeight = 15;
	var ballR = 10;
	var ballX = Math.random() * (frameWidth - ballR);
	var ballY = Math.random() * (frameHeight - ballR);
	var ballSpeedX = 3;
	var ballSpeedY = 3;
	var playerX = (frameWidth / 2) - (rectWidth / 2)
	var playerY = 450;
	window.playerSpeedX = 3;
	window.playerSpeedY = 0;
	registrateKeyEvents();
	setInterval(function() {
			ctx.clearRect(0, 0, frameWidth, frameHeight);
			ballCoords = moveBall(ballX, ballY, ballSpeedX, ballSpeedY, frameWidth, frameHeight, ballR);
			playerCoords = movePlayer(playerX, playerY, rectWidth, rectHeight, frameWidth, frameHeight);
			ballCoords = playerBallCollision(playerX, playerY, rectWidth, rectHeight, ballCoords['x'], ballCoords['y'], ballR, ballCoords['speedX'], ballCoords['speedY']);
			// drawBrick(ctx, x, y, width, height);
			// drawBricks(ctx, bricks);
			// ballBricksCollision(bricks, ballX, ballY, ballR, ballSpeedX, ballSpeedY);
			drawBall(ctx, ballCoords['x'], ballCoords['y'], ballR);
			ballX = ballCoords['x'];
			ballY = ballCoords['y'];
			ballSpeedX = ballCoords['speedX'];
			ballSpeedY = ballCoords['speedY'];			
			drawPlayer(ctx, playerCoords['x'], playerCoords['y'], rectWidth, rectHeight);
			playerX = playerCoords['x'];
			playerY = playerCoords['y'];
	}, 30);
}

// Moving functionality
function moveBall(x, y, speedX, speedY, frameWidth, frameHeight, ballRadius) {
	var r = ballRadius;
	if (x <= r  ||  x >= (frameWidth - r)) {
		speedX *= -1;		
	} else if (y >= (frameHeight - r) || y <= r) {
		speedY *= -1;
	}

	x += speedX;
	y += speedY;

	return {
		x: x,
		y: y,
		speedX: speedX,
		speedY: speedY
	};
}

function movePlayer(x, y, rectWidth, rectHeight, frameWidth, frameHeight) {
	if (x > (frameWidth - rectWidth) || x < 0) {
		window.playerSpeedX *= -1;
	};

	x += window.playerSpeedX;
	
	return {
		x: x,
		y: y
	};
}

// Drawing functionality
function drawBall(ctx, x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.stroke();
};

function drawPlayer(ctx, x, y, width, height) {
	ctx.beginPath();
	ctx.fillStyle="red";
	ctx.fillRect(x, y, width, height); 
	ctx.stroke();
};

function drawBrick(ctx, x, y, width, height) {
};

function drawBricks(ctx, bricks) {
	for (var i = 0; i < bricks.length - 1; i++) {
		drawBrick(ctx, bricks[i].x, bricks[i].y, bricks[i].speedX, bricks[i].speedY);
	}
};

// Checking collisions
function playerBallCollision(playerX, playerY, playerWidth, playerHeight, ballX, ballY, ballR, ballSpeedX, ballSpeedY) {
	// the logic for collisions and change of the speed

	// if (((playerX + playerWidth) == (ballX + ballR)) || (playerY + playerHeight) == (ballY + ballR)) {
	if ((ballY + ballR) >= (playerY - playerHeight) && (ballX + ballR) >= (playerX) && (ballX - ballR) <= (playerX + playerWidth / 2)) {
	
		
		ballSpeedY *= -1;
	}
	return {
		x: ballX,
		y: ballY,
		speedX: ballSpeedX,
		speedY: ballSpeedY
	}
}

function ballBricksCollision(bricks, ballX, ballY, ballR, ballSpeedX, ballSpeedY) {
	// the logic for collisions, delete bricks, and change the speed of the ball
	for (var i = bricks.length - 1; i >= 0; i--) {
		newBallSpeed = ballBrickCollision(); // delete logic
	}
	return {
		ballSpeedX: ballSpeedX,
		ballSpeedY: ballSpeedY
	}
}

// Keys events
function registrateKeyEvents() {
	document.addEventListener("keydown", function(event) {
	  	if (event.which ==  37  && window.playerSpeedX > 0 ) {
	  		window.playerSpeedX *= -1;
	  	}
	  	else if (event.which == 39 && window.playerSpeedX < 0) {
	  		window.playerSpeedX *= -1;
	  	}
	});
}