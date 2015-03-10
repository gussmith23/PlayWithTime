function Bullet(position,player,velocity){
	this.position = new Position(100,100);
	this.owner = player;
	this.velocity = new Velocity (10,10);
	this.acceleration = new Acceleration(0,0);
	this.force = new Force(0,0);
	
	this.mass = 10;
	
	if(typeof this.owner.bullet_color == 'Color') this.color = this.owner.bullet_color;
	else this.color = new Color(0,0,0);
}

Bullet.prototype.draw = function(ctx) { 
	ctx.fillStyle = this.color.toCSSFormat();
	ctx.fillRect(this.position.x,ctx.canvas.height - (this.position.y/*+playerHeight*/),2,2);
	
};