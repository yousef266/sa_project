import Question from "./Question";

export default function UserShowQuestions({ questions }) {
	return questions.map(
		(q, index) =>
			q.answer !== "" && (
				<Question
					key={index}
					question={q}
				/>
			)
	);
}
