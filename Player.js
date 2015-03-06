var playerHeight = 25;
var playerWidth = 20;

var vx = 0;
var vy = 0;

function Player(position,name,color) {
	this.position = position;
	this.name = name;
	this.color = color;
	
	this.playerHeight = 25;
	this.playerWidth = 20;

	this.vx = 0;
	this.vy = 0;
	
	this.bullet_color = new Color(0,0,0);
	
	this.velocity = new Velocity(0,0);
	this.acceleration = new Acceleration(0,0);
	
	this.mass = 500;
	
	this.force = new Force(0,0);
	this.force_old = new Force(0,0);
}

Player.prototype.draw = function(ctx) { // This function currently states that position is determined by the bottom left corner.
	ctx.fillStyle = this.color.toCSSFormat();
	ctx.fillRect(this.position.x,ctx.canvas.height - (this.position.y+playerHeight),playerWidth,playerHeight);
	
};