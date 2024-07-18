import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../util/http";

export default function UserData() {
	const navigate = useNavigate();
	const subjects = useLoaderData();
	let user = JSON.parse(localStorage.getItem("user"));
	const [error, setError] = useState("");

	function handleSubmit(event) {
		event.preventDefault();

		const subject = new FormData(event.target);
		const boxChannel = subject.getAll("box");
		const data = Object.fromEntries(subject.entries());
		data.box = boxChannel;

		let min = 4,
			max = 4;

		if (user.totalGpa >= 0) {
			max = 6;
		}

		if (user.totalGpa >= 2) {
			max = 4;
			if (user.totalGpa >= 3) {
				max += 2;
				if (user.totalGpa >= 3.4) {
					max += 1;
				}
			}
		}

		if (data.box.length < min || data.box.length > max) {
			setError(`You can register ${min}:${max} subjects only`);
		} else {
			setError("");
			let obj;
			let x = 0;
			data.box.forEach((e) => {
				const eArray = e.split(",");
				obj = { ...obj, [x++]: { name: eArray[0], hours: eArray[1] } };
			});
			user = { ...user, subjects: obj };
			localStorage.setItem("user", JSON.stringify(user));
			updateUser(user);
			navigate("/files");
		}
	}

	return (
		<div className="flex flex-col items-center mx-auto my-3">
			<h1 style={{ textAlign: "center", margin: "5px" }}>
				Choose Your Subjects!
			</h1>
			<form
				className=" w-[450px] p-6 rounded-2xl border-solid border-2 border-black flex flex-col gap-1 bg-[#fafafa]"
				onSubmit={handleSubmit}
			>
				{subjects.map((sub) => {
					const subject = [sub.name, sub.hours];
					return (
						<div
							className="flex items-center justify-between m-3 text-[22px]"
							key={sub._id}
						>
							<label>{sub.name}</label>
							<input
								type="checkbox"
								name="box"
								value={subject}
							/>
						</div>
					);
				})}
				<button className="transition-all text-white bg-[#005cc8] px-3 py-2 text-lg uppercase rounded-xl cursor-pointer hover:bg-[#004a9e]">
					Save
				</button>
			</form>
			{error !== "" && <p className=" text-center text-red-500 m-1">{error}</p>}
		</div>
	);
}

export async function loader() {
	const res = await axios.get("http://localhost:3001/subject");
	return res.data.subjects;
}
