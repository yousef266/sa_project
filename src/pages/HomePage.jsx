import { useLoaderData } from "react-router-dom";
import axios from "axios";
import QuizComponent from "../components/QuizComponent";

export default function Home() {
	// const user = JSON.parse(localStorage.getItem("user"));
	// const subjectsObj = user.subjects;
	// const subjects = Object.values(subjectsObj);
	const quizzesObj = useLoaderData();

	const quizzes = Object.values(quizzesObj);
	return (
		<>
			<div className="container mx-auto p-4">
				<div className="flex justify-center">
					<div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8">
						<h2 className="text-2xl font-bold mb-8">
							<i className="fas fa-graduation-cap"></i> Quizzes
						</h2>

						{quizzes.length !== 0 ? (
							quizzes.map((quiz) => (
								<QuizComponent
									key={quiz._id}
									quiz={quiz}
								/>
							))
						) : (
							<h4>You Have No Quizzes</h4>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export async function loader() {
	const res = await axios.get("http://localhost:3001/quiz");
	return res.data.quizzes;
}
