import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useState, useCallback } from "react";

import Question from "../components/Quiz/Question.jsx";
import Summary from "../components/Quiz/Summary.jsx";

export default function Quiz() {
	const { quiz } = useLoaderData();
	const QUESTIONS = quiz.questions;
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;
	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(
		selectedAnswer
	) {
		setUserAnswers((prevUserAnswers) => {
			return [...prevUserAnswers, selectedAnswer];
		});
	}, []);

	const handleSkipAnswer = useCallback(
		() => handleSelectAnswer(null),
		[handleSelectAnswer]
	);

	if (quizIsComplete) {
		return (
			<Summary
				QUESTIONS={QUESTIONS}
				userAnswers={userAnswers}
			/>
		);
	}

	return (
		<div
			id="quiz"
			className="mx-auto mt-12"
		>
			<Question
				key={activeQuestionIndex}
				QUESTIONS={QUESTIONS}
				index={activeQuestionIndex}
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</div>
	);
}

// eslint-disable-next-line no-unused-vars, react-refresh/only-export-components
export async function loader({ request, params }) {
	const id = params.quizId;

	const res = await axios.get("http://localhost:3001/quiz/" + id);
	return res.data;
}
