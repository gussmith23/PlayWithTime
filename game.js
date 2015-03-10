/*
 * Much of this borrows and is informed by the article "Real Time Multiplayer in HTML5"
 * by Sven Bergstrom (http://buildnewgames.com/real-time-multiplayer/). An incredible 
 * article for anyone interested in the subject.
 */
var tick = 45;
var physics_tick = 15;

var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var h = $("#canvas").height();
var w = $("#canvas").width();

var friction_coefficient = 0.95;
var friction_acceleration = -20;

var jump_velocity = 80;
var move_velocity = 20;

var players = {};
var bullets = new Array();

// This is just for messing around with movement. These variables should go within the Player object, most likely.
var keyPressed = false;
var keyPressEvent = null;
var keyPressArray = new Array();

function test() {
	alert("hi");
}

function init() {
	//alert(w);
	//alert(h);
	
	ctx.canvas.width = w;
	ctx.canvas.height = h;
	
	physics_init();
	
	
	// Make a player.
	player = new Player(new Position(10,0),"Gus",new Color(75,0,130));
	
	// Input checks.
	$(document).keydown(function (event) { 
		keyPressArray[event.which] = 1;
	} );
	
	$(document).keyup(function (event) { 
		keyPressArray[event.which] = 0;
	} );
	
	$(document).keypress(function (event) {
		keyPressed = true;
		keyPressEvent = event;
	});
	
	$(document).click(function (event) {
		bullets.push( new Bullet(new Position (100,100), player, new Velocity(0,0))); //this isn't working!!!
	});
	
	// Loop.
	setInterval(loop, tick);
	setInterval(physics_loop, physics_tick);
}

function loop() {
	
	
	
	//-Physics portion-----------------------------------------------------------------
	
	/*
	// Checking collision.
	if (player.position.x < 0 || player.position > w-player.playerWidth) {
		
		player.vx = 0;
		
		if(player.position.x < 0) {
			player.position.x = 0;
		}
		
		if(player.position > w-player.playerWidth) {
			player.position.x = w-player.playerWidth;
		}
		
	}
	
	if (player.position.y < 0 || player.position > h-player.playerHeight) {
		
		player.vy = 0;
		
		if(player.position.y < 0) {
			player.position.y = 0;
		}
		
		if(player.position > h-player.playerHeight) {
			player.position.y = h-player.playerHeight;
		}
		
	}*/
	
	
	//friction(player);
	
	
	// Handle any key presses.
	/*
	if (keyPressed) {
		
		//alert(keyPressEvent.which);
		
		// Jump
		if(keyPressEvent.which == 32 || keyPressEvent.which == 119){
			// Test
			player.vy = 100;
		}
		
		if(keyPressEvent.which == 65){
			player.vx = -10;
		}
		
		if(keyPressEvent.which == 68){
			player.vx = 10;
		}
		
		// When sufficiently handled, reset these variables.
		keyPressed = false;
		keyPressEvent = null;
	}*/
	
	// Key presses, new version. ---------------------------------------------------------
	/*
	// Jump
	if(keyPressArray[32]|| keyPressArray[119]){
		player.vy = jump_velocity;
		player.velocity.y = jump_velocity;
	}
	
	// Move left
	if(keyPressArray[65]){
		player.vx = -1*move_velocity;
		player.acceleration.x = -1*move_acceleration;
	}
	
	// Move right
	if(keyPressArray[68]){
		player.vx = move_velocity;
		player.acceleration.x = move_acceleration;
	}*/
	//------------------------------------------------------------------------------------
	
	/*
	// Velocity changes due to accel
	player.velocity.x += player.acceleration.x*(tick/1000);
	player.velocity.y += player.acceleration.y*(tick/1000);
	
	// Position changes due to velocity
	player.position.x += player.velocity.x*(tick/1000);
	player.position.y += player.velocity.y*(tick/1000);
	
	//alert(player.position);alert(player.vx);
	//player.position.x += player.vx*(tick/1000);
	//player.position.y += player.vy*(tick/1000);
	*/
	
	ctx.clearRect(0,0,w,h);
	
	// Test
	//ctx.fillText("bug",w*Math.random(),h*Math.random());
	
	
	//players.forEach( function(player) { player.draw(); } );
	player.draw(ctx);
	
	bullets.forEach( function(bullet) {
		bullet.draw(ctx);
	});
	
	// Display debug info
	ctx.font = "20px Arial";
	ctx.fillText("vx " + player.velocity.x,1,20); 
	ctx.fillText("vy " + player.velocity.y,1,40);
	ctx.fillText("ax " + player.acceleration.x,1,60); 
	ctx.fillText("ay " + player.acceleration.y,1,80);
	ctx.fillText("fx " + player.force.x,1,100); 
	ctx.fillText("fy " + player.force.y,1,120);
	
	
}

function friction(player) {
	
	//alert(player.position.x);
	
	if(player.position.y == 0) {
		/*player.vx *= friction_coefficient;
		//test
		player.acceleration.x *= friction_coefficient;*/
		
		if(player.velocity.x != 0) {
			player.acceleration.x = Math.abs(player.velocity.x)/player.velocity.x*friction_acceleration;
		}
		
		if(Math.abs(player.velocity.x)<.1){
			player.velocity.x = 0;
			player.acceleration.x = 0;
		}
	}
}