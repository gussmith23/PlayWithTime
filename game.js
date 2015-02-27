var tick = 40;
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var h = $("#canvas").height();
var w = $("#canvas").width();

var gravity = -100;

var players = {};

// This is just for messing around with movement. These variables should go within the Player object, most likely.
var keyPressed = false;
var keyPressEvent = null;

function test() {
	alert("hi");
}

function init() {
	alert(w);
	alert(h);
	
	ctx.canvas.width = w;
	ctx.canvas.height = h;
	
	
	// Make a player.
	player = new Player(new Position(10,0),"Gus",new Color(255,0,0));
	
	// Input checks.
	$(document).keydown(function (event) { 
		keyPressed = true;
		keyPressEvent = event;
	} );
	
	// Loop.
	setInterval(loop, tick);
}

function loop() {
	
	
	
	//-Physics portion-----------------------------------------------------------------
	
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
		
	}
	
	// Handle any key presses.
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
	}
	
	//alert(player.position);alert(player.vx);
	player.position.x += player.vx*(tick/1000);
	player.position.y += player.vy*(tick/1000);
	
	player.vy = player.vy + gravity*(tick/1000);
	
	ctx.clearRect(0,0,w,h);
	
	// Test
	//ctx.fillText("bug",w*Math.random(),h*Math.random());
	
	
	//players.forEach( function(player) { player.draw(); } );
	player.draw(ctx);
}