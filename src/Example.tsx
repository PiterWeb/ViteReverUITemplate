import { useEffect, useSignal } from "@UIFunctions";
import vitelogo from "/vite.svg";

export default function ExampleStateFull() {
    useEffect(ExampleStateFull, () => {
        console.log("ExampleStateFull mounted");
    });

    const count = useSignal(ExampleStateFull, 0, "count");

    const incrementCount = () => {
        count.value++;
    };

    const decrementCount = () => {
        count.value--;
    };

    useEffect(ExampleStateFull, () => {
        console.log("count changed to", count.value);
    }, [count])

    return (
        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 max-w h-screen mx-auto">
            <img
                className="w-16 h-16 mb-4"
                src={vitelogo}
                alt="Vite.js Logo"
                width="384"
                height="384"
            />
            <span>
                Powered by {""}
                <a className="text-blue-600" href="https://vitejs.dev/">
                    Vite
                </a>
            </span>
            <h1 className="text-3xl font-bold mb-8">ReactiveUI</h1>
            <div className="flex justify-center items-center bg-white rounded-full h-16 w-16 mb-8">
                <p className="text-2xl font-bold">{count.value}</p>
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
