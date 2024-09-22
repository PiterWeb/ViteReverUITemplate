import { $useEffect, $Component } from "reverui";
import $useCounter from "./hooks/useCounter";
import Counter from "./Counter";

export default function CounterWithHook(this: any) {
	$useEffect(() => {
		console.log("ExampleStateFull mounted");
	});

	const { count, decrementCount, incrementCount } = $useCounter();

	return (
		<div className="flex flex-col items-center rounded-lg p-6 max-w">
			<h2 className="text-2xl mb-8">Counter</h2>
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

			{/* Counter component embeded */}

			<$Component
				element={Counter}
				ref={this}
				props={{initialCount: 20}}
			></$Component>

		</div>
	);
}
