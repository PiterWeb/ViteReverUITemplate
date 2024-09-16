import "./index.css";
import {$UI} from "@UI";
import Counter from "./Counter";
import Todo from "./Todo";

$UI(Counter, document.getElementById("app") ?? document.body);

$UI(Todo, document.getElementById("app") ?? document.body);

$UI(Counter, document.getElementById("app") ?? document.body)

// UI.HandleStateFull(
//     FragmentTest,
//     document.getElementById("app") ?? document.body
// );

// UI.HandleStateFull(
//     DuplicateExampleStateFull,
//     document.getElementById("app") ?? document.body
// );
