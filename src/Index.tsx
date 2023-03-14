import UI from "@UI";

import { useState, useEffect } from "@UIFunctions";

export default function Index3(): HTMLElement {
    // Useffect de montado tiene que ir antes de los useState

    useEffect(Index3, () => {
        console.log("Index3 mounted");
    });

    const [counter, setCounter] = useState(Index3, 0, "counter");

    // Useffect de cambio de estado tiene que ir despues de los useState

    useEffect(
        Index3,
        () => {
            console.log("Counter changed to", counter);
        },
        ["counter"]
    );

    const handleClick = () => {
        setCounter(counter + 1);
    };

    return (
        <>
            <button onClick={handleClick}>Click me</button>
            <p>Counter : {counter}</p>
        </>
    );
}
