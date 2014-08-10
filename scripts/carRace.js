/* IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT */
/* http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing       */
/* Add clear method with saving transformation state                                      */
CanvasRenderingContext2D.prototype.clear =
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
/* IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT */



function game( canvasID )
{
	var map;
	var playerCar;
	
	var iH;
	
	var lastTime;
	var thisTime;
	var dt;
	
	var init = function()
	{
		canvas = $( canvasID )[0];
		ctx = canvas.getContext("2d");
		
		iH = new InputHandler();
		
		map			= new MapEntity( "images/map.jpg", ctx, true, canvas.width/2, canvas.height/2, false );
		playerCar	= new MapEntity( "images/top.png", ctx, true, canvas.width/2, canvas.height/2, true );
	}
	
	this.start = function()
	{
		lastTime = Date.now();
		requestAnimationFrame( gameLoop );
		
		//while( !map.loaded || !playerCar.loaded ){}; // wait till all is loaded
	}
	
	
	var gameLoop = function()
	{
		thisTime = Date.now();
		dt = ( thisTime - lastTime ) / 1000;
		lastTime = thisTime;
	
		iH.update( dt );
	
		ctx.clear();
		map.draw( iH.posX, iH.posY, 0 );
		playerCar.draw( 0, 0, iH.carHeading );
		
		requestAnimationFrame( gameLoop );
	}

	init();
}



// SETUP HTML PAGE
$( function()
{
	myGame = new game( "#view" );
	myGame.start();
});