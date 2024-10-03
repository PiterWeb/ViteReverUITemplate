import "./index.css";
import { $UI } from "reverui";
import { $lazy, $Router } from "reverouter";

$Router($UI, {
	"404": $lazy(() => import("./404")),
	"/": $lazy(() => import("./Banner")),
	"/todo": $lazy(() => import("./Todo")),
	"/counter": $lazy(() => import("./Counter")),
	"/counter-with-hook": $lazy(() => import("./CounterWithHook")),
}, {
	handleOnlyKnownRoutes: false,
});
