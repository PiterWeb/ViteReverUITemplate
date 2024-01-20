import { useSignal } from "@UIFunctions";

interface TodoItem {
    content: string;
    completed: "✔" | "❌";
}

export default function Todo() {
    //  create a todo ui

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

    function deleteTodo(event: Event) {

        const button = event.target as HTMLButtonElement;

        const index =  parseInt(button.getAttribute("key") ?? "");

        todos.value = todos.value.filter((_, i) => i !== index);

    }

    return (
        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 max-w h-screen mx-auto">
            <h1 className="text-3xl font-bold mb-8">Todo</h1>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                {todos.value.map((todo, i) => (
                    <li className="flex items-center">
                        <button onclick={deleteTodo} key={i} >{todo.completed}</button>
                        {todo.content}
                    </li>
                ))}

                {/* <li className="flex items-center">❌ At least 10 characters</li>
                <li class="flex items-center">
                    ✔ At least one lowercase character
                </li>
                <li class="flex items-center">
                    <svg
                        className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    At least one special character, e.g., ! @ # ?
                </li> */}
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
    );
}
