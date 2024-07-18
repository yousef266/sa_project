/* eslint-disable react/prop-types */
import { useState } from "react";

import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({
	index,
	onSelectAnswer,
	onSkipAnswer,
	QUESTIONS,
}) {
	const [answer, setAnswer] = useState({
		selectedAnswer: "",
		isCorrect: null,
	});

	let timer = 300000;

	if (answer.selectedAnswer) {
		timer = 1000;
	}

	if (answer.isCorrect !== null) {
		timer = 1500;
	}

	function handleSelectAnswer(answer) {
		setAnswer({
			selectedAnswer: answer,
			isCorrect: null,
		});

		setTimeout(() => {
			setAnswer({
				selectedAnswer: answer,
				isCorrect: QUESTIONS[index].answer === answer,
			});

			setTimeout(() => {
				onSelectAnswer(answer);
			}, 1500);
		}, 1000);
	}

	let answerState = "";

	if (answer.selectedAnswer && answer.isCorrect !== null) {
		answerState = answer.isCorrect ? "correct" : "wrong";
	} else if (answer.selectedAnswer) {
		answerState = "answered";
	}

	return (
		<div id="question">
			<QuestionTimer
				key={timer}
				timeout={timer}
				onTimeout={answer.answer === "" ? onSkipAnswer : null}
				mode={answerState}
			/>
			<h2>{QUESTIONS[index].q}</h2>
			<Answers
				answers={QUESTIONS[index].choices}
				selectedAnswer={answer.selectedAnswer}
				answerState={answerState}
				onSelect={handleSelectAnswer}
			/>
		</div>
	);
}
