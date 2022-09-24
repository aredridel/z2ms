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

export interface FeatureBase {
	name: string;
	property: string;
	type: string;
}

export interface LightFeature extends FeatureBase {
	type: 'light';
	features: Feature[];
}

export interface EnumFeature extends FeatureBase {
	type: 'enum';
	_representation?: string;
	values: string[];
}

export interface BinarySwitchFeature extends FeatureBase {
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

export interface NumericFeature extends FeatureBase {
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

export type Feature = LightFeature | EnumFeature | BinarySwitchFeature | NumericFeature | FeatureBase;

