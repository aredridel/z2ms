import type { Readable } from 'svelte/store';
import { readable } from 'svelte/store';
import { browser } from '$app/env';

interface MQTTMessage {
	topic: string;
	payload: any;
}

export function websocket(
	url: string
): Readable<Record<string, any>> & { send(message: MQTTMessage): void } {
	let ws: WebSocket | null = null;
	let state: Record<string, any> = {};
	return Object.assign(
		readable<Record<string, any>>(state, (set) => {
			if (browser) {
				ws = new WebSocket(url);
				ws.addEventListener('message', (message) => {
					const parsed = JSON.parse(message.data);
					if (isMQTTMessage(parsed)) {
						state[parsed.topic] = parsed.payload;
						set(state);
					}
				});

				return () => {
					if (ws) ws.close();
				};
			}
		}),
		{
			send(message: MQTTMessage) {
				if (ws) ws.send(JSON.stringify(message));
			}
		}
	);
}

function isMQTTMessage(x: any): x is MQTTMessage {
	return x && typeof x == 'object' && typeof x.topic == 'string' && 'payload' in x;
}
