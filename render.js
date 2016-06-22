function platform(divId, frameWidth, frameHeight) {
	var canvas = document.getElementById(divId);
	var ctx = canvas.getContext("2d");
	var rectWidth = 100;
	var rectHeight = 15;

	canvas.width = frameWidth;
	canvas.height = frameHeight;
	bouncingBall(ctx, frameWidth, frameHeight, 10, 3, 3);
	player(rectWidth, rectHeight, ctx, 500, 500, 1);
}

function bouncingBall(ctx, frameWidth, frameHeight, ballRadius, speedX, speedY) {
	var r = ballRadius;
	var x = Math.random() * (frameWidth - r);
	var y = Math.random() * (frameHeight - r);

	var ballSpawn = setInterval(function() {
		ctx.clearRect(x - (r/1.1), y - (r/1.1), 3 * r, 3 * r);
		x += speedX;
		y += speedY;
		if (x <= r  ||  x >= (frameWidth - r)) {
			speedX *= -1;		
		} else if (y >= (frameHeight - r) || y <= 10) {
			speedY *= -1;
		}
		ball(x, y, r);
	}, 1000.0 / 30);

	function ball(x, y, r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
	    ctx.stroke();
	};
}

function player(rectWidth, rectHeight, ctx, frameWidth, frameHeight,speed) {
	var x = (frameWidth / 2) - (rectWidth / 2)
	var y = 450;
	var platformSpawn =  setInterval(function() {
	    ctx.clearRect(x - (rectWidth / 2), y - (rectHeight / 2), rectWidth , rectHeight);
		x += speed

		document.addEventListener("keydown", function(event) {
		  	if (event.which ==  37  && speed > 0 ) {
		  		speed *= -1;
		  	}
		  	else if (event.which == 39 && speed < 0) {
		  		speed *= -1;
		  	}

		});
		if ( x > (frameWidth - rectWidth) || x < 0) {
			speed *= -1;
		}

		PlatformCanvas(x,y,ctx,rectWidth,rectHeight );
	}, 1000.0 / 50);

};

function PlatformCanvas(x,y,ctx,width,height) {
	ctx.beginPath();
	ctx.fillStyle="red";
	ctx.fillRect(x,y,width,height); 
	ctx.stroke();

};

