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
	var playerSpeedX = 3;
	var playerSpeedY = 0;

	setInterval(function() {
			ctx.clearRect(0, 0, frameWidth, frameHeight);
			ballCoords = moveBall(ballX, ballY, ballSpeedX, ballSpeedY, frameWidth, frameHeight, ballR);
			playerCoords = movePlayer(playerX, playerY, playerSpeedX, playerSpeedY, rectWidth, rectHeight, frameWidth, frameHeight);
			drawBall(ctx, ballCoords['x'], ballCoords['y'], ballR);
			ballX = ballCoords['x'];
			ballY = ballCoords['y'];
			ballSpeedX = ballCoords['speedX'];
			ballSpeedY = ballCoords['speedY'];			
			drawPlayer(ctx, playerCoords['x'], playerCoords['y'], rectWidth, rectHeight);
			playerX = playerCoords['x'];
			playerY = playerCoords['y'];
			playerSpeedX = playerCoords['speedX'];
			playerSpeedY = playerCoords['speedY'];
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

function movePlayer(x, y, speedX, speedY, rectWidth, rectHeight, frameWidth, frameHeight) {
	document.addEventListener("keydown", function(event) {
	  	if (event.which ==  37  && speedX > 0 ) {
	  		speedX *= -1;
	  	}
	  	else if (event.which == 39 && speedX < 0) {
	  		speedX *= -1;
	  	}
	});

	if (x > (frameWidth - rectWidth) || x < 0) {
		speedX *= -1;
	};

	x += speedX;
	
	return {
		x: x,
		y: y,
		speedX: speedX,
		speedY: speedY
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

