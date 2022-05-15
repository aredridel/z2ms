export interface Feature {
	name: string;
	property: string;
	type: string;
}

export interface LightFeature extends Feature {
	type: 'light';
	features: Feature[];
}

export interface EnumFeature extends Feature {
	type: 'enum';
	_representation?: string;
	values: string[];
}

export interface BinarySwitchFeature extends Feature {
	_representation?: boolean;
	type: 'binary';
	access: number;
	value_on: string;
	value_off: string;
	presets?: Array<{
		name: string;
		description: string;
		value: string;
	}>;
}

export interface NumericFeature extends Feature {
	_representation?: number;
	type: 'numeric';
	access: number;
	value_min: number;
	value_max: number;
	presets?: Array<{
		name: string;
		description: string;
		value: number;
	}>;
}

export interface DeviceDefinition {
	description: string;
	exposes: Feature[];
}
export interface Device {
	friendly_name: string;
	ieee_address: string;
	definition: DeviceDefinition;
}
