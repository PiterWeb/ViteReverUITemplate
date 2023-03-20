# ReactiveUI (React-like Library)

### 🔥 Similar to React 👀

### 🔑 TS Native 🔐

### ❌ No Virtual DOM 📦

#### Current functionality:

-   [x] JSX Elements (html & js evaluated)
-   [x] useState ♻
-   [x] useEffect (state changes & mounted)
-   [x] Fragments (<> </>)
-   [x] Conditional Rendering (ternary operator) ❓
-   [x] List Rendering (array.map) 📜
-   [x] Event Handling (all events in lowercase) <kbd>Click</kbd> <kbd>Key</kbd> ...
-   [x] TailwindCSS ✨
-   [x] Reusable Components on JSX (But cannot be stateful) 📦
-   [ ] Same Statefull Component on the same parent
-   [ ] Selective(Smart) Re-rendering 🧠

**The project is built on top of Vite**

This are the features that Vite provides:

-   JSX Parser (Configurable)
-   Typescript config
-   Bundler
-   HMR (Hot Module Replacement)
-   Support for CSS Preprocessors

### Examples:

- useState:

    ```tsx
    import UI from "@UI";
    import { useState } from "@UIFunctions";

    export default function StateFullApp() {

        const [value, setValue] = useState(StateFullApp,"initValue", 'id');

        return (
            <div>
                ...
            </div>
        );
    }
    ```

- useEffect:

    ```tsx
    import UI from "@UI";
    import { useEffect } from "@UIFunctions";

    export default function StateFullApp() {

        useEffect(StateFullApp, () => {
            console.log("Mounted");
        });

        const [counter, setCounter] = useState(StateFullApp,0, 'counter');

        useEffect(StateFullApp,() => {
            console.log("Counter value changed to " + counter);
        },["counter"]);

        return (
            <div>
                ...
            </div>
        );
    }
    ```

- Example Counter Component:

    ```tsx
    import UI from "@UI";
    import { useState, useEffect } from "@UIFunctions";

    export default function StateFullApp() {
        // UseEffect with no dependencies before useState will be called only on mount
        useEffect(StateFullApp, () => {
            console.log("Mounted");
        });

        const [counter, setCounter] = useState(StateFullApp, 0, "counter");
        // const [value, setValue] = useState(FunctionName, initialValue, 'id');

        // UseEffect with dependencies will be called only when the dependencies change
        useEffect(StateFullApp,() => {
            console.log("Counter value changed to " + counter);
        },["counter"]);

        return (
            <div>
                <h1>Stateful Component</h1>
                <p> Counter: {counter === 0 ? "You didn't click" : counter} </p>
                <button onclick={() => setCounter(counter + 1)}>Increment</button>
            </div>
        );
    }
    ```
