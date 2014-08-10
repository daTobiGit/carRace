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




function Car( pctx )
{
	var _this = this;
	
	/*- DISPLAY STUFF -*/
	var ctx;
	var canvas;
	var img;
	
	/*- STEERING -*/
	var posX;
	var posY;
	var carHeading;
	var carSpeed;
	var steerAngle;
	var wheelBase; 		// the distance between the two axles
	/*------------*/
	
	var direction;
	var acceleration;
	var oneDegree;
	var booster;
	
	var map;
	
	var init = function()
	{
		ctx = pctx;
		img = new Image();
		img.src = "images/top.png";
		
		map = new Image();
		map.src = "images/map.jpg";
		
		posX = 0;
		posY = 400;
		carHeading = 0; // right
		carSpeed = 0;
		
		steerAngle = 0;
		wheelBase = 60;
		
		direction = 0; // straight
		acceleration = 0; // standing
		oneDegree = Math.PI / 180;
		
		booster = false;
		
		$(document).keydown( function( event )
		{
			handleKeyPress( event.which );
		} );
		
		$(document).keyup( function( event )
		{
			handleKeyRelease( event.which );
		} );
	}

	var handleKeyPress = function( key )
	{
		switch( key )
		{
			case 37:
				direction = -1; // left
				break;
			case 39:
				direction = 1; // right
				break;
			case 40:
				acceleration = -1; // down
				break;
			case 38:
				acceleration = 1; // up
				break;
			case 32:
				booster = true;
				break;
			default:
				break;
		}
	}
	
	var handleKeyRelease = function( key )
	{
		switch( key )
		{
			case 37:
			case 39:
				direction = 0;
				break;
			case 40:
			case 38:
				acceleration = 0;
				break;
			case 32:
				booster = false;
			default:
				break;
		}
	}
	
	this.draw = function()
	{
		ctx.clear();
		ctx.save();
		ctx.translate( -posX, -posY );
		//ctx.rotate( carHeading );
		ctx.drawImage( map, 0, 0 );
		ctx.restore();
		
		ctx.save();
		ctx.translate( 400, 400 );
		ctx.rotate( carHeading );
		ctx.drawImage( img, -img.width/2, -img.height/2 );
		ctx.restore();
	}
	
	this.update = function( dt )
	{
		
		if( booster )
		{
			carSpeed = 500;
		}
		else if( acceleration )
		{
			carSpeed += 5 * acceleration;
			if( carSpeed > 300 ){ carSpeed = 300; }
			if( carSpeed < -50 ){ carSpeed = -50; }			
		}
		
		if( direction )
		{
			steerAngle = 45 * direction * oneDegree;
		}
		else
		{
			steerAngle = 0;
		}
	
		var frontWheelX = posX + wheelBase/2 * Math.cos(carHeading);
		var frontWheelY = posY + wheelBase/2 * Math.sin(carHeading);
		
		var backWheelX = posX - wheelBase/2 * Math.cos(carHeading);
		var backWheelY = posY - wheelBase/2 * Math.sin(carHeading);
		
		backWheelX += carSpeed * dt * Math.cos(carHeading);
		backWheelY += carSpeed * dt * Math.sin(carHeading);
		
		frontWheelX += carSpeed * dt * Math.cos(carHeading+steerAngle);
		frontWheelY += carSpeed * dt * Math.sin(carHeading+steerAngle);
		
		posX = (frontWheelX + backWheelX) / 2;
		posY = (frontWheelY + backWheelY) / 2;
		
		carHeading = Math.atan2( frontWheelY - backWheelY , frontWheelX - backWheelX );
	
		var msg = "posX: " + posX + "<br>";
		msg += "posY: " + posY + "<br>";
		msg += "angl: " + steerAngle + "<br>";
		msg += "heading:" + carHeading + "<br>";
		
		$( "#log" ).html( msg );
	}
	
	init();
}


function game( canvasID )
{

	var myCar;
	var lastTime;
	var thisTime;
	var dt;
	
	var init = function()
	{
		canvas = $( canvasID )[0];
		ctx = canvas.getContext("2d");
		
		myCar = new Car( ctx );
	}
	
	this.start = function()
	{
		lastTime = Date.now();
		requestAnimationFrame( gameLoop );
	}
	
	
	var gameLoop = function()
	{
		thisTime = Date.now();
		dt = ( thisTime - lastTime ) / 1000;
		lastTime = thisTime;
	
		myCar.draw();
		myCar.update( dt );
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