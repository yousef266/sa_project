/* eslint-disable react/prop-types */
import SelectSubject from "../SelectSubject";
import { updateQuestions } from "../../util/http";
import { useState } from "react";

export default function AddQuestionForm({ onAdd, questions }) {
	const [error, setError] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const courseName = data.get("dir");
		const question = data.get("question");
		if (courseName.length === 0 || question.length === 0) {
			setError(" enter valid data");
		} else {
			// check if question already exists
			let flag = false;
			console.log(typeof questions);
			questions.forEach((q) => {
				if (q.courseName === courseName && q.question === question) {
					setError("Question already exists");
					flag = true;
					return;
				}
			});

			if (flag) return;

			setError("");

			// create new question object
			const newQuestion = {
				courseName,
				question,
				answer: "",
			};

			// add question to database
			updateQuestions(newQuestion);
			onAdd(newQuestion);
		}
	};
	return (
		<div className="flex flex-col p-5 m-5 bg-[#FAFAFA] border-solid border-2 border-black rounded-md">
			<h2 className=" text-center text-lg font-bold">Add a Question</h2>
			<form
				onSubmit={onSubmit}
				className="flex flex-col gap-3 mt-3"
			>
				<textarea
					placeholder="Enter your question"
					className="border-solid border-2 border-[#D4D4D8] rounded-md p-3"
					name="question"
				></textarea>
				<SelectSubject />
				<button className="transition-all text-white bg-[#005cc8] px-3 py-2 text-lg uppercase rounded-md cursor-pointer hover:bg-[#004a9e]">
					Submit
				</button>
			</form>
			{error !== "" && <p className=" text-center text-red-500 m-1">{error}</p>}
		</div>
	);
}
