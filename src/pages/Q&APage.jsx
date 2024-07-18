/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";

import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { updateQuestions } from "../util/http";

import AddQuestionForm from "../components/Q&A/AddQuestionForm";
import AdminShowQuestions from "../components/Q&A/AdminShowQuestions";
import UserShowQuestions from "../components/Q&A/UserShowQuestions";

/* eslint-disable react/prop-types */
export default function QA() {
	const initializeQuestions = useLoaderData();
	const [questions, setQuestions] = useState(initializeQuestions);
	const { isAdmin } = JSON.parse(localStorage.getItem("user"));

	const handleQuestionSubmit = (newQuestion) => {
		setQuestions((state) => [...state, newQuestion]);
	};

	const handleAnswerSubmit = (index, answer) => {
		const updatedQuestions = [...questions];
		updatedQuestions[index] = {
			...updatedQuestions[index],
			answer,
		};
		updateQuestions(updatedQuestions[index]);
		setQuestions(updatedQuestions);
	};

	return (
		<div>
			<ul>
				{isAdmin ? (
					<AdminShowQuestions
						questions={questions}
						onAnswerSubmit={handleAnswerSubmit}
					/>
				) : (
					<UserShowQuestions questions={questions} />
				)}
			</ul>
			{!isAdmin && (
				<AddQuestionForm
					questions={questions}
					onAdd={handleQuestionSubmit}
				/>
			)}
		</div>
	);
}

export async function loader() {
	const res = await axios.get("http://localhost:3001/question");
	return res.data.questions;
}
