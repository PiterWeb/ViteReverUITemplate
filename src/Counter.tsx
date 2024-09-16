import { useEffect, useSignal } from "@UIFunctions";

export default function Counter() {
	useEffect(() => {
		console.log("ExampleStateFull mounted");
	});

	const count = useSignal(0);

	const incrementCount = () => {
		count.value++;
	};

	const decrementCount = () => {
		count.value--;
	};

	useEffect(() => {
		console.log(`Count changed to`, count.value);
	}, [count]);

	return (
		<div className="flex flex-col items-center rounded-lg p-6 max-w">
			<h2 className="text-3xl font-bold mb-8">Counter</h2>
			<div className="flex justify-center items-center bg-white rounded-full h-16 w-16 mb-8">
				{<p className="text-2xl font-bold text-black">{count.value}</p>}
			</div>
			<div className="flex justify-center items-center">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
					onclick={decrementCount}
				>
					-
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					onclick={incrementCount}
				>
					+
				</button>
			</div>
		</div>
	);
}
