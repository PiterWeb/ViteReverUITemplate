import "./index.css";
import {$UI} from "reverui";

import Todo from "./Todo";
import Banner from "./Banner";
import CounterWithHook from "./CounterWithHook";
import Counter from "./Counter";

$UI(Banner, document.getElementById("banner"))
$UI(Todo, document.getElementById("grid"));
$UI(Counter, document.getElementById("grid"));
$UI(CounterWithHook, document.getElementById("grid"))
