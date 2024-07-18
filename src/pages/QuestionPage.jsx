// /* eslint-disable react/prop-types */
// function App() {
// 	const [questions, setQuestions] = useState([]);

// 	const handleQuestionSubmit = (courseName, question) => {
// 		const newQuestion = {
// 			courseName,
// 			question,
// 			answered: false,
// 			answer: null,
// 		};
// 		setQuestions([...questions, newQuestion]);
// 	};

// 	const handleAnswerSubmit = (index, answer) => {
// 		const updatedQuestions = [...questions];
// 		updatedQuestions[index] = {
// 			...updatedQuestions[index],
// 			answered: true,
// 			answer,
// 		};
// 		setQuestions(updatedQuestions);
// 	};

// 	return (
// 		<div>
// 			<StudentForm
// 				onSubmit={handleQuestionSubmit}
// 				questions={questions}
// 			/>
// 			<hr />
// 			<ProfessorComponent
// 				questions={questions}
// 				onAnswerSubmit={handleAnswerSubmit}
// 			/>
// 		</div>
// 	);
// }

// function StudentForm({ onSubmit, questions }) {
// 	const [courseName, setCourseName] = useState("");
// 	const [question, setQuestion] = useState("");

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		onSubmit(courseName, question);
// 		setCourseName("");
// 		setQuestion("");
// 	};

// 	return (
// 		<div>
// 			<h2>Student Form</h2>
// 			<form onSubmit={handleSubmit}>
// 				<input
// 					type="text"
// 					placeholder="Course Name"
// 					value={courseName}
// 					onChange={(e) => setCourseName(e.target.value)}
// 				/>
// 				<textarea
// 					placeholder="Enter your question"
// 					value={question}
// 					onChange={(e) => setQuestion(e.target.value)}
// 				></textarea>
// 				<button type="submit">Submit</button>
// 			</form>
// 			<hr />
// 			<h3>All Questions</h3>
// 			<ul>
// 				{questions.map((q, index) => (
// 					<li key={index}>
// 						<strong>Course: {q.courseName}</strong>
// 						<p>Question: {q.question}</p>
// 						{q.answered ? <p>Answer: {q.answer}</p> : null}
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

// function ProfessorComponent({ questions, onAnswerSubmit }) {
//   const handleAnswer = (index, answer) => {
//     onAnswerSubmit(index, answer);
//   };

//   const unansweredQuestions = questions.filter((q) => !q.answered);

//   return (
//     <div>
//       <h2>Professor Component</h2>
//       <ul>
//         {unansweredQuestions.map((q, index) => (
//           <li key={index}>
//             <strong>Course: {q.courseName}</strong>
//             <p>Question: {q.question}</p>
//             <AnswerQuestionForm index={index} onAnswer={handleAnswer} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function AnswerQuestionForm({ index, onAnswer }) {
//   const [answer, setAnswer] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAnswer(index, answer);
//     setAnswer("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         placeholder="Enter your answer"
//         value={answer}
//         onChange={(e) => setAnswer(e.target.value)}
//       ></textarea>
//       <button type="submit">Submit Answer</button>
//     </form>
//   );
// }

// export default App;
