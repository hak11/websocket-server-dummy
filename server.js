const WebSocket = require('ws');
const PORT = 8080

const webSocketServer = new WebSocket.Server({ port: PORT });

webSocketServer.on('connection', webSocket => {
	webSocket.on('message', message => {
		console.log('Received:', message);
		broadcast(message);
	});
});

function broadcast(data) {
	webSocketServer.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
}
console.log('Socket Run On PORT :', PORT);
