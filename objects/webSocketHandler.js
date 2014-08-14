
function WebSocketHandler()
{
	var _this = this;
	var ws;
	var connected = false;
   
	var init = function()
	{
		
	}
	
	_this.connect = function( address )
	{
		ws = new WebSocket( address ); // "ws://139.22.81.91:8025/websockets/game"
		ws.onopen    = onOpen;
		ws.onclose   = onClose;
		ws.onmessage = onMessage;
		ws.onerror   = onError;
	}
	
	var onOpen = function()
	{
		connected = true;
		console.log("WebSocket connected");
	}
	
	var onClose = function()
	{
		connected = false;
		console.log("WebSocket disconnected");
	}
	
	var onMessage = function( msg )
	{
		var obj = eval("(" + msg.data + ")");
		updateEnemy(obj);
	}
	
	var onError = function( error )
	{
		console.log(error);
	}
	
	_this.closeWebsocket = function()
	{
		ws.close();
	}
	
	_this.sendMessage = function( msg )
	{
		if( connected )
		{
			ws.send( msg );
		}
	}

	init();
}