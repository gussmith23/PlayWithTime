function Color(r,g,b)
{
  this.red = r;
  this.green = g;
  this.blue = b;
}

Color.prototype.toCSSFormat = function(){
	return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
};