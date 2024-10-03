// import Expander from "./Expander";
import reverLogo from "/logo_rever.webp";

// import { $Component } from "reverui";
import { $Link } from "reverouter";

export default function Banner(this: any) {
	return (
		<div className="flex flex-col items-center rounded-lg p-6 mx-auto">
			<img
				className="w-16 h-16 mb-4 rounded-lg"
				src={reverLogo}
				alt="ReverUI Logo"
				width="384"
				height="384"
			/>
			<span>
				Powered by {""}
				<a className="text-blue-600" href="https://vitejs.dev/">
					Vite
				</a>
			</span>
			<h1 className="text-3xl font-bold mb-8">ReverUI</h1>
			<p className="bg-gray-200 p-6 text-black rounded text-md">
				All the website was created using exclusively{" "}
				<a
					href="https://github.com/PiterWeb/ReverUI"
					className="underline"
				>
					ReverUI
				</a>
				&{" "}
				<a
					href="https://github.com/PiterWeb/ReverRouter"
					className="underline"
				>
					ReverRouter
				</a>
			</p>

			<h3 className="text-2xl font-bold mt-8 mb-4">Examples</h3>

			{/* <$Component element={Expander} ref={this} props={{}}/> */}

			<div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl mt-8">
				<$Link
					href="/counter"
					className="text-blue-500 hover:text-blue-300 transition-colors duration-300"
				>
					Counter
				</$Link>
				<$Link
					className="text-blue-500 hover:text-blue-300 transition-colors duration-300"
					href="/counter-with-hook"
				>
					Counter With Hook
				</$Link>
				<$Link
					className="text-blue-500 hover:text-blue-300 transition-colors duration-300"
					href="/todo"
				>
					Todo
				</$Link>
				<$Link
					className="text-blue-500 hover:text-blue-300 transition-colors duration-300"
					href="/invented-route"
				>
					Route not found
				</$Link>
			</div>
		</div>
	);
}
