import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { addQuiz } from "../util/http";

const AddQuiz = () => {
	const subjectsObj = useLoaderData();
	const navigate = useNavigate();
	const subjects = Object.values(subjectsObj);

	const [subject, setSubject] = useState("");
	const [quizName, setQuizName] = useState("");
	const [error, setError] = useState("");
	const [questions, setQuestions] = useState([
		{ q: "", choices: ["", "", "", ""], answer: "" },
		{ q: "", choices: ["", "", "", ""], answer: "" },
		{ q: "", choices: ["", "", "", ""], answer: "" },
		{ q: "", choices: ["", "", "", ""], answer: "" },
		{ q: "", choices: ["", "", "", ""], answer: "" },
	]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create the quiz object
		const quiz = {
			name: quizName,
			sub: subject,
			questions: questions.map((q) => ({
				q: q.q,
				choices: q.choices,
				answer: q.answer,
			})),
		};

		// Log the quiz object (you can modify this part according to your use case)
		const quizId = await addQuiz(quiz);
		console.log(quizId);
		if (quizId !== -1) navigate("/quizzes/" + quizId, { replace: true });
		else setError("invalid quiz data");

		// Reset form fields after submission
		// setSubject("");
		// setQuizName("");
		// setQuestions([
		// 	{ q: "", choices: ["", "", "", ""], answer: "" },
		// 	{ q: "", choices: ["", "", "", ""], answer: "" },
		// 	{ q: "", choices: ["", "", "", ""], answer: "" },
		// 	{ q: "", choices: ["", "", "", ""], answer: "" },
		// 	{ q: "", choices: ["", "", "", ""], answer: "" },
		// ]);
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-center">
				<div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold mb-8">Add Quiz</h2>

					<form onSubmit={handleSubmit}>
						{/* Subject Name Input */}
						<div className="mb-6">
							<label
								htmlFor="subject"
								className="block text-sm font-medium text-gray-700"
							>
								Subject Name:
							</label>

							<select
								required
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								className="mt-1 p-2 block w-full border rounded-md"
							>
								{subjects.map((subject) => (
									<option
										key={subject.name}
										value={subject.name}
									>
										{subject.name}
									</option>
								))}
							</select>
						</div>

						{/* Quiz Name Input */}
						<div className="mb-6">
							<label
								htmlFor="quizName"
								className="block text-sm font-medium text-gray-700"
							>
								Quiz Name:
							</label>
							<input
								type="text"
								value={quizName}
								onChange={(e) => setQuizName(e.target.value)}
								className="mt-1 p-2 block w-full border rounded-md"
							/>
						</div>

						{/* Questions Input */}
						{questions.map((q, index) => (
							<div
								key={index}
								className="mb-8"
							>
								<h4 className="text-lg font-semibold mb-2">
									Question {index + 1}
								</h4>

								<div className="mb-4">
									<label
										htmlFor={`question-${index}`}
										className="block text-sm font-medium text-gray-700"
									>
										Question:
									</label>
									<textarea
										value={q.q}
										onChange={(e) => {
											const updatedQuestions = [...questions];
											updatedQuestions[index].q = e.target.value;
											setQuestions(updatedQuestions);
										}}
										className="mt-1 p-2 block w-full border rounded-md"
									/>
								</div>

								<div className="mb-4">
									<label
										htmlFor={`choices-${index}`}
										className="block text-sm font-medium text-gray-700"
									>
										Choices:
									</label>
									{q.choices.map((choice, choiceIndex) => (
										<input
											key={choiceIndex}
											type="text"
											value={choice}
											onChange={(e) => {
												const updatedQuestions = [...questions];
												updatedQuestions[index].choices[choiceIndex] =
													e.target.value;
												setQuestions(updatedQuestions);
											}}
											className="mt-1 p-2 block w-full border rounded-md mb-2"
										/>
									))}
								</div>

								<div className="mb-4">
									<label
										htmlFor={`answer-${index}`}
										className="block text-sm font-medium text-gray-700"
									>
										Correct Answer:
									</label>
									<select
										value={q.answer}
										onChange={(e) => {
											const updatedQuestions = [...questions];
											updatedQuestions[index].answer = e.target.value;
											setQuestions(updatedQuestions);
										}}
										className="mt-1 p-2 block w-full border rounded-md"
									>
										{q.choices.map((choice, choiceIndex) => (
											<option
												key={choiceIndex}
												value={choice}
											>
												{choice}
											</option>
										))}
									</select>
								</div>
							</div>
						))}

						{/* Submit Button */}
						<button
							type="submit"
							className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
						>
							Submit
						</button>
						{error && <p>{error}</p>}
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddQuiz;
