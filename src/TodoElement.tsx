import { Signal } from "reverui";
import { TodoItem } from "./Todo";

export default function TodoElement({todos, value, index}: {
    todos: Signal<TodoItem[]>;
    value: TodoItem;
    index: number;
}) {
	
    function deleteTodo(index: number) {
		todos.value = [...todos.value.filter((_, i) => i !== index)];
	}

    return (
		<li className="max-w-md mx-auto p-4" key={index}>
			<div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg mb-2">
				<div className="flex items-center space-x-3">
					<input
						type="checkbox"
						className="form-checkbox h-5 w-5 text-blue-600 rounded"
						checked={value.completed}
						onchange={(e: any) =>
							(todos.value[index].completed = e.target?.checked)
						}
					/>
					<span className="text-lg font-medium text-gray-900">
						{value.content}
					</span>
				</div>

				<button
					className="text-red-500 hover:text-red-600 focus:outline-none"
					onclick={() => deleteTodo(index)}
				>
					❌
				</button>
			</div>
		</li>
	);
}
