import { $useEffect, $useSignal } from "reverui";
import Counter from "./Counter";

export default function Expander() {
	const showExpanded = $useSignal(false);

	$useEffect(() => {
		console.log(showExpanded.value);
	}, [showExpanded]);

	function toogleExpand() {
		showExpanded.value = !showExpanded.value;
	}
	return (
		<>
			<button onclick={toogleExpand}>Show / Hide Embeded Counter</button>
			<$Show
				when={showExpanded.value}
				element={() => <$Component element={Counter} props={{}} />}
			/>
		</>
	);
}
