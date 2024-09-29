export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

export function mapBetweenRanges(
	value: number,
	minInput: number,
	maxInput: number,
	minOutput: number,
	maxOutput: number,
): number {
	return mapRatio((value - minInput) / (maxInput - minInput), minOutput, maxOutput);
}

export function mapRatio(value: number, minOutput: number, maxOutput: number): number {
	return value * (maxOutput - minOutput) + minOutput;
}

export type Vec2D = {
	x: number;
	y: number;
};

export type Rect2D = {
	width: number;
	height: number;
};

export const Vec2DMath = {
	sub(v1: Vec2D, v2: Vec2D): Vec2D {
		return {
			x: v1.x - v2.x,
			y: v1.y - v2.y,
		};
	},
	scale(k: number, v: Vec2D): Vec2D {
		return {
			x: v.x * k,
			y: v.y * k,
		};
	},
};
