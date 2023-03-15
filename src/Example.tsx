import UI from "@UI";
import { useState, useEffect } from "@UIFunctions";
import vitelogo from "/vite.svg";

export default function ExampleStateFull() {
    useEffect(ExampleStateFull, () => {
        console.log("ExampleStateFull mounted");
    });

    const [count, setCount] = useState(ExampleStateFull, 0, "count");

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        setCount(count - 1);
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
            <img
                className="`w-16 h-16 mb-4`"
                src={vitelogo}
                alt="Vite.js Logo"
            />
            <span>
                Powered by {""}
                <a className="text-blue-600" href="https://vitejs.dev/">
                    Vite
                </a>
            </span>
            <h1 className="text-3xl font-bold mb-8">ReactiveUI</h1>
            <div className="flex justify-center items-center bg-white rounded-full h-16 w-16 mb-8">
                <p className="text-2xl font-bold">{count}</p>
            </div>
            <div className="flex justify-center items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
                    onClick={decrementCount}
                >
                    -
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={incrementCount}
                >
                    +
                </button>
            </div>
        </div>
    );
}
