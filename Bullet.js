function Bullet(position,player,velocity){
	this.position = position;
	this.owner = player;
	this.velocity = velocity;
	
	if(typeof owner.bullet_color == 'Color') this.color = owner.bullet_color;
	else this.color = new Color(0,0,0);
}

Bullet.prototype.draw = function(ctx) { 
	ctx.fillStyle = this.color.toCSSFormat();
	ctx.fillRect(this.position.x,ctx.canvas.height - (this.position.y/*+playerHeight*/),2,2);
	
};