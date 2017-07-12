function getFriction() {
	return 0.1;
}

function getMaxForce() {
	return 0.05;
}

Boid.prototype.update = function() {
	// Limit acceleration force (smaller values make for wider turns)
	limitForce(this.acceleration);

	// Update velocity
	this.velocity.add(this.acceleration);	

	// Apply velocity to position
	this.position.add(this.velocity);

	// Reset acceleration
	this.acceleration.zero();

	// Apply friction
	this.velocity.multiplyScalar(1 - getFriction());
}

Boid.prototype.steer = function(desired) {
	return desired.subtract(this.velocity);
}

function limitForce(vector) {
	var maxForce = getMaxForce();
	if (vector.length() > maxForce) {
		vector.normalize().multiplyScalar(maxForce);
	}
	return vector;
}