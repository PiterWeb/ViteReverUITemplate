import vitelogo from "/vite.svg";

export default function Banner() {
	return (
		<div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 max-w mx-auto">
			<img
				className="w-16 h-16 mb-4"
				src={vitelogo}
				alt="Vite.js Logo"
				width="384"
				height="384"
			/>
			<span>
				Powered by {""}
				<a className="text-blue-600" href="https://vitejs.dev/">
					Vite
				</a>
			</span>
			<h1 className="text-3xl font-bold mb-8">ReactiveUI</h1>
		</div>
	);
}
