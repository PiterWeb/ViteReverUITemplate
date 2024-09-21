import { $useEffect, $useSignal } from "reverui";

interface TodoItem {
	content: string;
	completed: boolean;
}

export default function Todo() {

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

	function deleteTodo(index: number) {
		todos.value = [...todos.value.filter((_, i) => i !== index)];
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
					{todos.value.map((todo, i) => (
						<li className="max-w-md mx-auto p-4" key={i}>
							<div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg mb-2">
								<div className="flex items-center space-x-3">
									<input
										type="checkbox"
										className="form-checkbox h-5 w-5 text-blue-600 rounded"
										checked={todo.completed}
										onchange={(e: any) => todos.value[i].completed = e.target?.checked}
									/>
									<span className="text-lg font-medium text-gray-900">
										{todo.content}
									</span>
								</div>

								<button
									className="text-red-500 hover:text-red-600 focus:outline-none"
									onclick={() => deleteTodo(i)}
								>
									❌
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
