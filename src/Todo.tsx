import { $useEffect, $useSignal } from "reverui";
import TodoElement from "./TodoElement";

export interface TodoItem {
	content: string;
	completed: boolean;
}

export default function Todo(this: any) {
	const todos = $useSignal<TodoItem[]>([]);

	function addTodo(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		const data = new FormData(form);

		todos.value = [
			...todos.value,
			{ content: data.get("content") as string, completed: false },
		];
	}

	$useEffect(() => {
		console.table(todos.value);
	}, [todos]);

	return (
		<div>
			<div className="flex flex-col items-center rounded-lg p-6 max-w">
				<h2 className="text-2xl mb-8">Todo</h2>

				<form
					className="flex justify-center items-center"
					onsubmit={addTodo}
				>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					>
						+
					</button>

					<input
						type="text"
						name="content"
						id="content"
						placeholder="Add todo"
						className="border-2 border-gray-500 rounded-full px-4 py-2 mx-4"
					/>
				</form>

				<ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
					<$For
						each={todos.value}
						element={({ value, index }) => (
							<TodoElement
								todos={todos}
								value={value}
								index={index}
							/>
						)}
					/>
				</ul>
			</div>
		</div>
	);
}
