import axios from "axios";
import { useLoaderData } from "react-router-dom";
import File from "../components/File";

// eslint-disable-next-line react/prop-types
export default function Files() {
	const files = useLoaderData();
	return (
		<div className="bg-zinc-300 grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-8 p-8">
			{files[0] !== undefined ? (
				files.map((file) => (
					<File
						key={file._id}
						contentType={file.contentType}
						name={file.name}
						url={file.url}
					/>
				))
			) : (
				<p>There is no files right now</p>
			)}
		</div>
	);
}

// eslint-disable-next-line no-unused-vars, react-refresh/only-export-components
export async function loader({ request, params }) {
	const subject = params.subId;
	const res = await axios.get("http://localhost:3001/file/" + subject);
	return res.data.files;
}
