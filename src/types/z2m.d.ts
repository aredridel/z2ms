export interface Feature {
	name: string;
	property: string;
	presets?: Array<{
		name: string;
		description: string;
		value: any;
	}>;
	type: string;
}

export interface BinarySwitchFeature extends Feature {
	type: 'binary';
	value_on: string;
	value_off: string;
}

export interface NumericFeature extends Feature {
	type: 'numeric';
	value_min: number;
	value_max: number;
}

export type FeatureWithReturnTypes = [BinarySwitchFeature, boolean] | [NumericFeature, number];

export interface FeatureGroup {
	features: Feature[];
	type: string;
}

export interface DeviceDefinition {
	description: string;
	exposes: FeatureGroup[];
}
export interface Device {
	friendly_name: string;
	ieee_address: string;
	definition: DeviceDefinition;
}
