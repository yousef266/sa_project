import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AnswerQuestionForm({ index, onAnswer }) {
	const [answer, setAnswer] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onAnswer(index, answer);
		setAnswer("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col mt-3 gap-3"
		>
			<textarea
				placeholder="Enter your answer"
				className="border-solid border-2 border-black rounded-md p-3"
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
			></textarea>
			<button className="transition-all text-white bg-[#005cc8] px-3 py-2 text-lg uppercase rounded-md cursor-pointer hover:bg-[#004a9e]">
				Submit Answer
			</button>
		</form>
	);
}
