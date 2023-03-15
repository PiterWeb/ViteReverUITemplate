import "./index.css";
import UI from "@UI";
import Example from "./Example";
// import FragmentTest from "./FragmentTest";
// import DuplicateExampleStateFull from "./DuplicatedExample";

UI.HandleStateFull(Example, document.getElementById("app") ?? document.body);

// UI.HandleStateFull(
//     FragmentTest,
//     document.getElementById("app") ?? document.body
// );

// UI.HandleStateFull(
//     DuplicateExampleStateFull,
//     document.getElementById("app") ?? document.body
// );
