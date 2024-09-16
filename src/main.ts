import "./index.css";
import {$UI} from "@UI";
import Counter from "./Counter";
import Todo from "./Todo";
import Banner from "./Banner";
import CounterWithHook from "./CounterWithHook";

$UI(Banner, document.getElementById("banner"))
$UI(Todo, document.getElementById("grid"));
// $UI(Counter, document.getElementById("grid"));
$UI(CounterWithHook, document.getElementById("grid"))


// $UI(Counter, document.getElementById("app") ?? document.body)

// UI.HandleStateFull(
//     FragmentTest,
//     document.getElementById("app") ?? document.body
// );

// UI.HandleStateFull(
//     DuplicateExampleStateFull,
//     document.getElementById("app") ?? document.body
// );
