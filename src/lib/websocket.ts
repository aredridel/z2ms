import { derived, readable, type Readable, type Updater, type Writable } from 'svelte/store';
import { browser } from '$app/env';
import { bijectiveMapping } from './lens';
import type {
	Device,
	Feature,
	BinarySwitchFeature,
	NumericFeature,
	EnumFeature,
	LightFeature
} from '$types/z2m';

interface MQTTMessage {
	topic: string;
	payload: any;
}

export type MQTTStore = Readable<FeatureValues> & { send(message: MQTTMessage): void };

export function websocket(url: string): MQTTStore {
	let ws: WebSocket | null = null;
	let state: Record<string, any> = {};
	let done = false;
	return Object.assign(
		readable<Record<string, any>>(state, (set) => {
			if (browser) {
				connect();

				return () => {
					done = true;
					if (ws) ws.close();
				};
			}

			function connect() {
				ws = new WebSocket(url);
				ws.addEventListener('message', (message) => {
					const parsed = JSON.parse(message.data);
					if (isMQTTMessage(parsed)) {
						state[parsed.topic] = parsed.payload;
						set(state);
					}
				});

				ws.addEventListener('close', () => {
					if (!done) connect();
				});
			}
		}),
		{
			send(message: MQTTMessage) {
				if (ws) ws.send(JSON.stringify(message));
			}
		}
	);
}

export function valueAt(store: Readable<Record<string, any>>, path: string): Readable<any> {
	return derived(store, (store) => {
		return store[path];
	});
}

export function mqttWriteStore(inner: Readable<any>, store: MQTTStore, device: Device) {
	let last: FeatureValues = {};
	return {
		subscribe(fn: (x: any) => void) {
			return inner.subscribe((val) => {
				last = val;
				fn(last);
			});
		},
		set(val: FeatureValues) {
			store.send({ topic: `${device.friendly_name}/set`, payload: val });
		},
		update(fn: Updater<FeatureValues>) {
			const val = fn(last);
			store.send({ topic: `${device.friendly_name}/set`, payload: val });
		}
	};
}

export function isNumericFeature(x: Feature): x is NumericFeature {
	return x.type == 'numeric';
}

export function isBinaryFeature(x: Feature): x is BinarySwitchFeature {
	return x.type == 'binary';
}

export function isEnumFeature(x: Feature): x is EnumFeature {
	return x.type == 'enum';
}

export function isLightFeature(x: Feature): x is LightFeature {
	return x.type == 'light';
}

type FeatureValues = Record<string, any>;

export function valueForService<T extends Feature & { _representation?: any }>(
	store: MQTTStore,
	device: Device,
	feature: T
): Writable<T['_representation']> {
	const inner = valueAt(store, device.friendly_name);
	if (isBinaryFeature(feature)) {
		return bijectiveMapping<FeatureValues, T['_representation']>(
			mqttWriteStore(inner, store, device),
			(internal: FeatureValues) => internal[feature.property] == feature.value_on,
			(val): FeatureValues => ({
				[feature.property]: val ? feature.value_on : feature.value_off
			})
		);
	} else if (isNumericFeature(feature)) {
		return bijectiveMapping<FeatureValues, T['_representation']>(
			mqttWriteStore(inner, store, device),
			(internal: FeatureValues) => Number(internal[feature.property]),
			(val): FeatureValues => ({ [feature.property]: Number(val) })
		);
	} else if (isEnumFeature(feature)) {
		return bijectiveMapping<FeatureValues, T['_representation']>(
			mqttWriteStore(inner, store, device),
			(internal: FeatureValues) => internal[feature.property],
			(val): FeatureValues => ({ [feature.property]: val })
		);
	} else {
		throw new Error('bug');
	}
}

function isMQTTMessage(x: any): x is MQTTMessage {
	return x && typeof x == 'object' && typeof x.topic == 'string' && 'payload' in x;
}

export enum FeatureAccessMode {
	NONE,
	ACCESS_STATE = 0b001,
	ACCESS_WRITE = 0b010,
	ACCESS_READ = 0b100
}
