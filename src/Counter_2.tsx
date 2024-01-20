import { useSignal, useEffect } from "@UIFunctions";

export default function Counter_2() {
    // UseEffect with no dependencies before useState will be called only on mount
    useEffect(() => {
        console.log("Mounted");
    });

    const counter = useSignal(0);
    // const signal = useSignal(initialValue);

    // UseEffect with dependencies will be called only when the dependencies change
    useEffect(() => {
        console.log("Counter value changed to " + counter.value);
    }, [counter]);

    return (
        <div>
            <h1>Stateful Component</h1>
            <p>
                {" "}
                Counter:{" "}
                {counter.value === 0 ? "You didn't click" : counter.value}{" "}
            </p>
            <button className="p-4 bg-red-400" onclick={() => counter.value++}>
                Increment
            </button>
        </div>
    );
}
