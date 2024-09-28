import Expander from "./Expander";
import reverLogo from "/logo_rever.webp";

import { $Component } from "reverui";

export default function Banner(this: any) {

	return (
		<div className="flex flex-col items-center rounded-lg p-6 w-max mx-auto">
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
				All the website was created using exclusively <a href="https://github.com/PiterWeb/ReverUI" className="underline">ReverUI</a>
			</p>
			<$Component element={Expander} ref={this}/>
			
		</div>
	);
}
