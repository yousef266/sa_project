/* eslint-disable react/prop-types */
import AnswerQuestionForm from "./AnswerQuestionForm";

export default function Question({ question, index, onAnswerSubmit }) {
	return (
		<li className=" flex gap-4 flex-col m-5 border-solid border-2 border-black rounded-md p-5 bg-[#FAFAFA]">
			<strong>Course: {question.courseName}</strong>
			<div className="flex flex-col">
				<p>Question: {question.question}</p>
				{question.answer !== "" ? (
					<p>Answer: {question.answer}</p>
				) : (
					<AnswerQuestionForm
						index={index}
						onAnswer={onAnswerSubmit}
					/>
				)}
			</div>
		</li>
	);
}
