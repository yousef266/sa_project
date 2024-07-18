import axios from "axios";
import { json } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
export async function addQuiz(quiz) {
	const res = await axios.post("http://localhost:3001/quiz", quiz);
	if (res.data.status === 422 || res.data.status === 401) {
		console.log(res.data);
		return -1;
	}

	const resOK = res && res.data.status === 200 && res.statusText === "OK";

	if (!resOK) {
		console.log(res.data);
		return -1;
	}

	return res.data.quizID;
}

export async function updateUser(user) {
	const res = await axios.post("http://localhost:3001/user", user);

	if (res.data.status === 422 || res.data.status === 401) {
		console.log(res.data);
		return res;
	}

	const resOK = res && res.data.status === 200 && res.statusText === "OK";

	if (!resOK) {
		console.log(res.data);
		throw json({ message: "Could not authenticate user." }, { status: 500 });
	}
}

export async function updateQuestions(questions) {
	const res = await axios.post("http://localhost:3001/question", questions);

	if (res.data.status === 422 || res.data.status === 401) {
		console.log(res.data);
		return res;
	}

	const resOK = res && res.data.status === 200 && res.statusText === "OK";

	if (!resOK) {
		console.log(res.data);
		throw json({ message: "Could not authenticate user." }, { status: 500 });
	}
}

export async function fetchSubjects() {
	const res = await axios.get("http://localhost:3001/subject");
	return res.data.subjects;
}
