import "./index.css";
import UI from "@UI";
import Counter from "./Counter";
import Todo from "./Todo";

UI.HandleStateFull(Counter, document.getElementById("app") ?? document.body);

UI.HandleStateFull(Todo, document.getElementById("app") ?? document.body);


// UI.HandleStateFull(
//     FragmentTest,
//     document.getElementById("app") ?? document.body
// );

// UI.HandleStateFull(
//     DuplicateExampleStateFull,
//     document.getElementById("app") ?? document.body
// );
