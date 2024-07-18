import Question from "./Question";

export default function AdminShowQuestions({ questions, onAnswerSubmit }) {
	return questions.map((question, index) => (
		<Question
			key={index}
			index={index}
			onAnswerSubmit={onAnswerSubmit}
			question={question}
		/>
	));
}
