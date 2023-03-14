import UI from "@UI";
import ExampleStateFull from "./ExampleStateFull";
import ExampleStateLess from "./ExampleStateLess";

UI.HandleStateFull(
    ExampleStateFull,
    document.getElementById("app") ?? document.body
);

UI.HandleStateLess(
    ExampleStateLess,
    document.getElementById("app") ?? document.body
);
