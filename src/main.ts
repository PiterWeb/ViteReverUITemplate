import "./index.css";
import {$UI} from "@UI";

import Todo from "./Todo";
import Banner from "./Banner";
import CounterWithHook from "./CounterWithHook";

$UI(Banner, document.getElementById("banner"))
$UI(Todo, document.getElementById("grid"));
// $UI(Counter, document.getElementById("grid"));
$UI(CounterWithHook, document.getElementById("grid"))
