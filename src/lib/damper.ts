import { get, readable, type Updater, type Writable } from 'svelte/store';

export function damper<T>(
	store: Writable<T>
): Writable<T> & { hold: () => void; release: () => void } {
	let held = false;
	let set_: (val: T) => void;
	let value: T;
	return Object.assign(
		readable(get(store), (set: (val: T) => void) => {
			set_ = set;
			const stop = store.subscribe((val: T) => {
				value = val;
				if (!held) {
					set(value);
				}
			});
			return () => {
				stop();
				held = true;
			};
		}),
		{
			set(val: T) {
				return store.set(val);
			},
			update(fn: Updater<T>) {
				return store.update(fn);
			},
			hold() {
				held = true;
			},
			release() {
				held = false;
				if (set_) set_(value);
			}
		}
	);
}
