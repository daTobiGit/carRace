
function Waypoint( startX, startY, endX, endY, carHeading )
{
	this.sX = startX;
	this.sY = startY;
	this.eX = endX;
	this.eY = endY;
	
	this.spawnX = ( startX + endX ) / 2 ;
	this.spawnY = ( startY + endY ) / 2;
	this.heading = carHeading;
}

var a = new Waypoint( 1060, 335, 1171, 433, 0 );
var b = new Waypoint( 3087, 137, 3181, 266, 0 );
var c = new Waypoint( 2577, 1880, 2673, 2058, 0 );
var d = new Waypoint( 422, 1658, 528, 1807, 0 );
var e = new Waypoint( 2367, 2680, 2467, 2802, 0 );
var f = new Waypoint( 979, 2917, 1102, 3068, 0 );

waypointList = [ a, b, c, d, e, f ];