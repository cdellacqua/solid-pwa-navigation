export function dbg<T>(v: T, msg?: string): T {
	if (msg) {
		console.log(msg, v);
	} else {
		console.log(v);
	}
	return v;
}
