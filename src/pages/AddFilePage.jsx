import axios from "axios";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import SelectSubject from "../components/SelectSubject";

export default function AddFile() {
	const navigate = useNavigate();
	const [fileName, setFileName] = useState("");
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "loading";
	const [error, setError] = useState(false);

	function changeHandler(e) {
		setFileName(e.target.files[0].name);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		const dataObj = Object.fromEntries(data.entries());
		if (dataObj.file.size === 0) {
			setError(true);
		} else {
			axios
				.post("http://localhost:3001/file", data)
				.then(() => {
					navigate(`/files/${dataObj.dir.toLowerCase()}`);
				})
				.catch((er) => console.log(er));
		}
	}

	return (
		<div className="flex flex-col items-center mx-auto my-3">
			<form
				className="w-[450px] p-6 rounded-2xl border-solid border-2 border-black flex flex-col gap-8 bg-[#fafafa]"
				onSubmit={handleSubmit}
			>
				<div>
					<label
						className="rounded-2xl relative border-solid border-2 border-[#D4D4D8] w-[100%] block p-4 text-center"
						htmlFor="file"
					>
						<p className="p-2 m-4">Select file</p>
						{fileName !== "" && (
							<p className="absolute translate-y-[80%] translate-x-[-50%] w-[300px] top-1/2 left-1/2">
								{fileName}
							</p>
						)}
					</label>
					<input
						className=" hidden"
						type="file"
						name="file"
						id="file"
						onChange={changeHandler}
					/>
				</div>

				<SelectSubject />
				<button className=" transition-all text-white bg-[#005cc8] px-3 py-2 text-lg uppercase rounded-xl cursor-pointer hover:bg-[#004a9e]">
					{isSubmitting ? "Submitting..." : "Upload"}
				</button>
			</form>
			{error && (
				<p className=" text-center text-red-500 m-1">Please Choose a file</p>
			)}
		</div>
	);
}
