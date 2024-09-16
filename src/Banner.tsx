import reverLogo from "/logo_rever.webp";

export default function Banner() {
	return (
		<div className="flex flex-col items-center rounded-lg p-6 max-w mx-auto">
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
		</div>
	);
}
