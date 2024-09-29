export type NodeRef<T> = T | undefined | ((el: T | undefined) => void);
export type RefProps<T> = {ref?: NodeRef<T>};

export function propagateRef<T>(refContent: T | undefined, props?: RefProps<T>): void {
	if (!props?.ref) {
		return;
	}
	if (typeof props.ref === 'function') {
		(props.ref as (el: T | undefined) => void)(refContent);
	} else {
		(props.ref as T | undefined) = refContent;
	}
}
