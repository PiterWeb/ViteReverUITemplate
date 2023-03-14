import UI from "@UI";

import { useState, useEffect } from "@UIFunctions";

export default function ExampleStateLess(): HTMLElement {
    // Mounted useeffect has to come before useState

    useEffect(ExampleStateLess, () => {
        console.log("ExampleStateLess mounted");
    });

    const [counter, setCounter] = useState(ExampleStateLess, 0, "counter");

    // Useeffect of change of state has to go after the useState

    useEffect(
        ExampleStateLess,
        () => {
            console.log("Counter changed to", counter);
        },
        ["counter"]
    );

    const handleClick = () => {
        setCounter(counter + 1); // The state is updated but the component is not re-rendered because it is stateless
    };

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
            <>
                <p>Counter : {counter}</p>
                <span>StateLess</span>
            </>
        </div>
    );
}
