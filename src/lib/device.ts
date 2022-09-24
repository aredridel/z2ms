import type {Feature} from "../lib/feature.ts";

export interface DeviceDefinition {
	description: string;
	exposes: Feature[];
}
export interface Device {
	friendly_name: string;
	ieee_address: string;
	definition: DeviceDefinition;
}

