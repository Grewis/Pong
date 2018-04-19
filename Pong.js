var Player1 = {
	x: 40,
	y: 250,
}

var Player2 = {
	x: 460,
	y: 250,
}

var Bricks = []
var Ball = {
	x: 250,
	y: 250,
	angle: Math.random() * 360,
	speed: 1,
}


function setup() 
{
	createCanvas(500, 500);
	frameRate(5000);
}

function draw()
{
	background(150, 150, 150);
	keyHandling();
	drawPlayers();
	collideWall();
	collidePlayers();
	updateBall();
	drawBall();
}

function keyHandling()
{
	if (keyIsDown(UP_ARROW))
		if (Player2.y - 30 > 0)
			Player2.y -= 5;
	if (keyIsDown(DOWN_ARROW))
		if (Player2.y + 30 < 500)
			Player2.y += 5;
	if (keyIsDown(90))
		if (Player1.y - 30 > 0)
			Player1.y -= 5;
	if (keyIsDown(83))
		if (Player1.y + 30 < 500)
			Player1.y += 5;
}

function drawPlayers()
{
	stroke(255);
	strokeWeight(10);
	line(Player1.x, Player1.y - 30, Player1.x, Player1.y + 30);
	line(Player2.x, Player2.y - 30, Player2.x, Player2.y + 30);
}

function updateBall()
{
	Ball.x += Ball.speed * Math.cos(Ball.angle * Math.PI / 180);
	Ball.y -= Ball.speed * Math.sin(Ball.angle * Math.PI / 180);
}


function collidePlayers()
{
	if (Ball.x < Player1.x + 10 && Ball.x > Player1.x - 10 && Ball.y < Player1.y + 30 && Ball.y > Player1.y - 30)
	{
		Ball.angle = 180 - Ball.angle;
		Ball.speed += 0.5;
	}
	if (Ball.x < Player2.x + 10 && Ball.x > Player2.x - 10 && Ball.y < Player2.y + 30 && Ball.y > Player2.y - 30)
	{
		Ball.angle = 180 - Ball.angle;
		Ball.speed += 0.5;
	}
}

function collideWall()
{
	if (Ball.x > 495)
		endGame("Player 1 Win !");
	if (Ball.x < 5)
		endGame("Player 2 Win !");
	if (Ball.y < 5 || Ball.y > 495)
	{
		Ball.angle = -Ball.angle ;
	}
}

function drawBall()
{
	noStroke();
	fill(255);
	ellipse(Ball.x, Ball.y, 10, 10);
}

function endGame(winner) {
	noStroke();
	textAlign(CENTER);
	textSize(60);
	fill(255);
	text(winner, width / 2, height / 2);
	noLoop();
  }
  