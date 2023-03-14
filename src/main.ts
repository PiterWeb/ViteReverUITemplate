import "./index.css";
import UI from "@UI";
import Example from "./Example";

UI.HandleStateFull(Example, document.getElementById("app") ?? document.body);

// StateLess Example
// UI.HandleStateLess(
//     Example,
//     document.getElementById("app") ?? document.body
// );
