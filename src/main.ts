import "./index.css";

import { $lazy, $Router } from "reverouter";

$Router({
	"/": $lazy(() => import("./Banner")),
	"/todo": $lazy(() => import("./Todo")),
	"/counter": $lazy(() => import("./Counter")),
	"/counter-with-hook": $lazy(() => import("./CounterWithHook")),
});
