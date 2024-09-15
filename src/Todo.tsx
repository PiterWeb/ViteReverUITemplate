import { useEffect, useSignal } from "@UIFunctions";

interface TodoItem {
	content: string;
	completed: "✔" | "❌";
}

export default function Todo() {
	const todos = useSignal<TodoItem[]>([]);

	function addTodo(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		const data = new FormData(form);

		todos.value = [
			...todos.value,
			{ content: data.get("content") as string, completed: "❌" },
		];

	}

	function deleteTodo(index:number) {
		todos.value = [...todos.value.filter((_, i) => i !== index)];
	}

	useEffect(() => {

		console.table(todos.value)

	}, [todos])

	return (
		<div>
			<style>
				{`
                    * {
                        color: red;
                    }
                `}
			</style>

			<div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 max-w h-screen mx-auto">
				<h1 className="text-3xl font-bold mb-8">Todo</h1>
				<ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
					{todos.value.map((todo, i) => (
						<li className="flex items-center" key={i}>
							<button onclick={() => deleteTodo(i)}>
								{todo.completed}
							</button>
							{todo.content}
						</li>
					))}
				</ul>

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
			</div>
		</div>
	);
}
