export default function NotFoundRoute() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-6xl font-bold text-gray-100">404</h1>
			<p className="text-2xl text-gray-400 mt-4">Route not found</p>
			<a
				href="/"
				className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
			>
				Go back home
			</a>
		</div>
	);
}
