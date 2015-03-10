var forces = new Array();

var force_gravity = -1000;


var move_acceleration = 50;
var jump_acceleration = 100;
var force_move_lateral = 1000;
var force_jump = 6000;
var force_normal_coefficient = 1;
var acceleration_gravity = -10;

var test_world_mass = Number.MAX_VALUE;

// The current step desired by the time loop. Will be read by some of the forces (we could also pass it in as an arg)
var current_step;

function physics_init() {
	forces.push(gravity);
	forces.push(jump);
	forces.push(move_lateral);
	
	
	// For now, normal force calculated last
	forces.push(normal);
}

function physics_loop() {
	
	physics_time_step(player, 100);
	
	bullets.forEach( function(bullet) {
		physics_time_step(bullet, 100);
	});
	
}

function physics_time_step(player1, step) {
	
	current_step = step;
	
	calculate_net_force(player1);
	
	calculate_acceleration(player1);
	
	calculate_velocity(player1, step);
	
	calculate_position(player1,step);
	
	test_collision(player1);
}

function calculate_net_force(player1) {
	
	player1.force_old = player1.force;
	
	player1.force.x = 0;
	player1.force.y = 0;
	for (i = 0; i < forces.length; i++) {
		forces[i](player1);
	}
}

function calculate_acceleration(player1) {
	player1.acceleration.x = player1.force.x/player.mass;
	player1.acceleration.y = player1.force.y/player.mass;
}

function calculate_velocity(player1,step) {
	player1.velocity.x += player1.acceleration.x*(step/1000);
	player1.velocity.y += player1.acceleration.y*(step/1000);
}

function calculate_position(player1,step) {
	
	console.log(player1);
	console.log(player1.position);
	console.log(player1.velocity);
	console.log(player1.acceleration);
	console.log(player1.force);
	
	player1.position.x += player1.velocity.x*(step/1000);
	player1.position.y += player1.velocity.y*(step/1000);
}


//-FORCES-------------------------------------------------------------

function gravity(player1) {
	ctx.fillText("before gravity " + player1.force.y,400,20); 
	
	player1.force.y += player1.mass*acceleration_gravity;
	
	ctx.fillText("after gravity " + player1.force.y,400,40); 
}

function jump(player1) {	
	
	//THIS ISN'T WORKING FOR SOME REASON RIGHT NOW
	
	//console.log(keyPressArray);
	
	// Jump
	if(keyPressArray[32]|| keyPressArray[119]){
		player1.force.y += force_jump;
	}
	
	/*
	if(keyPressed&& (keyPressEvent.which == 32|| keyPressEvent.which == 119) ) {
		player1.force.y += 1000;
	}*/
	
	ctx.fillText("after jump " + player1.force.y,400,60); 
}

function move_lateral(player1) {
	// Move left
	if(keyPressArray[65]){
		player1.force.x += -1*force_move_lateral;
	
	}
	// Move right
	if(keyPressArray[68]){
		player1.force.x += force_move_lateral;
	}
	
}

function normal(player1) {
	
	/*if (player1.position.y <= 0 && player1.force_old.y <= 0) {
		player1.force.y += -1*player1.force_old.y;
	}*/
	
	// Another way of doing this...this requires that the normal force be calculated last, which i'd like to avoid.
	/*if (player1.position.y <= 0 && player1.force.y < 0) {
		player1.force.y = Math.pow(player1.position.y,1);
	}*/
	
	/*if (player1.position.y <= 0 && player1.force.y < 0) {
		player1.force.y = 0;
		player1.position.y = 0;
	}*/
	
	// Zero-out force, and then add some on top to move object upwards.
	/*if (player1.position.y <= 0 && player1.force_old.y <= 0) {
		player1.force.y = 0;
		player1.force.y += (0-player1.position.y)*force_normal_coefficient;
	}*/
	
	if (player1.position.y <= 0 && player1.force.y < 0) {
		player1.force.y *= 2*player1.position.y;
	}
	
	ctx.fillText("after normal " + player1.force.y,400,80); 

	
}

function test_collision(player1) {
	if(player1.position.y <=0 && player1.velocity.y < 0){
		//var momentum = player1.mass * player1.velocity.y;
		var new_velocity = (player1.mass)/(player1.mass + test_world_mass)*player1.velocity.y;
		player1.velocity.y = new_velocity;
	}
}