export async function animationFrame(opts?: {signal?: AbortSignal}): Promise<DOMHighResTimeStamp> {
	opts?.signal?.throwIfAborted();
	return await new Promise((res, rej) => {
		const abortListener = () => {
			if (id) {
				cancelAnimationFrame(id);
				rej(opts?.signal?.reason);
			}
		};
		opts?.signal?.addEventListener('abort', abortListener, {once: true});
		let id: ReturnType<typeof requestAnimationFrame> | null = requestAnimationFrame((timestamp) => {
			id = null;
			opts?.signal?.removeEventListener('abort', abortListener);
			res(timestamp);
		});
	});
}
