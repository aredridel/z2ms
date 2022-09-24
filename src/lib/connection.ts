import { websocket } from '$lib/websocket';
export const state = websocket('ws://homeassistant.local:8099/api');

if (typeof window != 'undefined') {
	/// @ts-expect-error
	window.socket = state;
}
