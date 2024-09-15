// export function useState<t>(initvalue: t) {
//     return {} as [t, (newValue: t) => void];
// }

interface Signal<t> {
	value: t;
}

export function useSignal<T>(initvalue: T) {
	return {} as Signal<T>;
}
export function useEffect(
	callback: () => void,
	dependencies?: Signal<unknown>[] | string[]
) {}
