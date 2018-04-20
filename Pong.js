// Player 1 est un objet contenant les coordonnées du joueur 1
var Player1 = { 
	x: 40,
	y: 250,
}

// Player 2 est un objet contenant les coordonnées du joueur 2
var Player2 = {
	x: 460,
	y: 250,
}

//Ball est un objet contenant les cordonnées de la balle, son angle en degrés, et sa vitesse
var Ball = {
	x: 250,
	y: 250,
	angle: Math.random() * 360,
	speed: 2,
}

// La fonction setup est une fonction appelée par la librairie p5 à l'initialisation.
function setup() 
{
	createCanvas(500, 500); // Une fonction de la librairie p5 qui permet de créer le terrain de jeux
	frameRate(100); // Une fonction de p5 qui permet de définir les images par seconde
}

// La fonction draw est appelée par p5 à chaque boucle de jeux elle contient 
function draw()
{
	background(150, 150, 150); // On met la couleur du fond à un gris clair en RGB
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
	if (keyIsDown(90)) // le code ASCII pour le caractère 'Z'
		if (Player1.y - 30 > 0)
			Player1.y -= 5;
	if (keyIsDown(83)) // le code ASCII pour le caractère 'S'
		if (Player1.y + 30 < 500)
			Player1.y += 5;
}

function drawPlayers()
{
	stroke(255, 255, 255); // On met la couleur du contour en blanc
	strokeWeight(10); // On met l'epaisseur du contour à 10
	line(Player1.x, Player1.y - 30, Player1.x, Player1.y + 30); // On dessine le joueur 1 qui est une ligne 
	line(Player2.x, Player2.y - 30, Player2.x, Player2.y + 30); // Pareil pour le joueur 2
}

function updateBall()
{
	// Formule magique pour définir la position de la balle en fonction de l'angle
	Ball.x += Ball.speed * Math.cos(Ball.angle * Math.PI / 180); 
	Ball.y -= Ball.speed * Math.sin(Ball.angle * Math.PI / 180);
}


function collidePlayers()
{
	if (Ball.x < Player1.x + 10 && Ball.x > Player1.x - 10 && Ball.y < Player1.y + 30 && Ball.y > Player1.y - 30) // On vérifie la collision avec le joueur 1
	{
		// On renvoie la balle de l'autre coté et on augmente la vitesse
		Ball.angle = 180 - Ball.angle;
		Ball.speed += 0.5;
	}
	if (Ball.x < Player2.x + 10 && Ball.x > Player2.x - 10 && Ball.y < Player2.y + 30 && Ball.y > Player2.y - 30) // On vérifie la collision avec le joueur 2
	{
		// On renvoie la balle de l'autre coté et on augmente la vitesse
		Ball.angle = 180 - Ball.angle;
		Ball.speed += 0.5;
	}
}

function collideWall()
{
	if (Ball.x > 495) // Condition de victoire du joueur 1
		endGame("Player 1 Win !");
	if (Ball.x < 5) // Condition de victoire du joueur 2
		endGame("Player 2 Win !");
	if (Ball.y < 5 || Ball.y > 495) // Si la balle frappe les murs supérieur et inférieur
		Ball.angle = -Ball.angle ;
}

function drawBall() // Fonction qui permet de dessiner la balle
{
	noStroke(); //On dessine sans contour 
	fill(255, 255, 255); // On prend blanc comme couleur pour la balle 
	ellipse(Ball.x, Ball.y, 10, 10); // On dessine une ellipse de même taille ce qui donne un rond
}

function endGame(winner) { // Fonction de fin de partie 
	noStroke();
	textAlign(CENTER);
	textSize(60);
	fill(255);
	text(winner, width / 2, height / 2);
	noLoop();
  }
  