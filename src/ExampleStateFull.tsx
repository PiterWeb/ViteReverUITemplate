import UI from "@UI";

import { useState, useEffect } from "@UIFunctions";

export default function ExampleStateFull(): HTMLElement {
    // Mounted useeffect has to come before useState

    useEffect(ExampleStateFull, () => {
        console.log("ExampleStateFull mounted");
    });

    const [counter, setCounter] = useState(ExampleStateFull, 0, "counter");

    // Useeffect of change of state has to go after the useState

    useEffect(
        ExampleStateFull,
        () => {
            console.log("Counter changed to", counter);
        },
        ["counter"]
    );

    const handleClick = () => {
        setCounter(counter + 1); // The state is updated & the component is re-rendered with the new value
    };

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
            <>
                <p>Counter : {counter}</p>
                <span>StateFull</span>
            </>
        </div>
    );
}
