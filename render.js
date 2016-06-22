function platform(divId, frameWidth, frameHeight) {
	var canvas = document.getElementById(divId);
	var ctx = canvas.getContext("2d");

	canvas.width = frameWidth;
	canvas.height = frameHeight;
	//bouncingBall(ctx, frameWidth, frameHeight, 10, 3, 3);
	player(ctx, 500, 2);
}

function bouncingBall(ctx, frameWidth, frameHeight, ballRadius, speedX, speedY) {
	ctx.clearRect(0, 0, frameWidth, frameHeight);
	var r = ballRadius;
	var x = Math.random() * (frameWidth - r);
	var y = Math.random() * (frameHeight - r);

	var ballSpawn = setInterval(function() {
		ctx.clearRect(0, 0, frameWidth, frameHeight);
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

function player(ctx, width, speed) {

}