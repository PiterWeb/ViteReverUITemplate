import "./index.css";

import Banner from "./Banner";

import { $lazy, $Router } from "reverouter";

$Router({
	"/": () => Banner,
	"/todo": $lazy(() => import("./Todo")),
	"/counter": $lazy(() => import("./Counter")),
	"/counter-with-hook": $lazy(() => import("./CounterWithHook")),
});
