import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";
import {v4} from "https://deno.land/std/uuid/mod.ts";

let sockets = new Map<string, WebSocket>();

interface BroadCast {
	name: String,
	mssg: String
}

// broadcast ev to all clients
const bcEvent = (obj: BroadCast) => {
	sockets.forEach( (ws: WebSocket) => {
		ws.send(JSON.stringify(obj))
	})
}

const chatConnection = async (ws: WebSocket) => {
	console.log('new socket connection');
	const uuid = v4.generate()
	sockets.set(uuid, ws);
	// console.log(sockets);

	for await (const ev of ws) {
		console.log(ev);

		// delete sokect
		if (isWebSocketCloseEvent(ev)) {
			sockets.delete(uuid);
		}

		if (typeof(ev) === 'string') {
			let evObj = JSON.parse(ev);
			console.log(evObj);
			bcEvent(evObj);
		}
	}
}

export {chatConnection};
