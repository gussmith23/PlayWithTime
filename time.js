/**
 * Time engine.
 */

var tick = 0;

// Array of functions which listen for tick.
var listeners = {};

function time_init(var tick) {
  
}

function time_loop() {
  
  listeners.forEach(function(listener){listener();});
}

function add_time_listener(var listener) {
  listeners[] = listener;  
}