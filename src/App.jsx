import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import Files, { loader as fetchFile } from "./pages/FilesPage";
import Home, { loader as eventsLoader } from "./pages/HomePage";
import Quiz, { loader as fetchQuiz } from "./pages/QuizPage";
import UserData, { loader as fetchSubjects } from "./pages/UserDataPage";
import AuthenticationPage, {
	action as authAction,
} from "./pages/AuthenticationPage.jsx";
import RootLayout from "./Layout/RootLayout.jsx";
import AddFile from "./pages/AddFilePage.jsx";
import Folders from "./pages/FoldersPage.jsx";
import GpaCalculator from "./pages/GpaCalculatorPage.jsx";
import AddQuiz from "./pages/AddQuizPage.jsx";
import MainNavigation from "./components/MainNavigation";
import ErrorPage from "./pages/ErrorPage.jsx";
import QA, { loader as fetchQuestions } from "./pages/Q&APage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: (
			<>
				<MainNavigation />
				<ErrorPage />
			</>
		),

		children: [
			{
				index: true,
				element: <Home />,
				loader: eventsLoader,
			},
			{
				path: "files",
				element: <Folders />,
			},
			{
				path: "files/:subId",
				element: <Files />,
				loader: fetchFile,
			},
			{
				path: "quizzes",
				element: <Navigate to="/" />,
			},
			{
				path: "quizzes/:quizId",
				element: <Quiz />,
				loader: fetchQuiz,
			},
			{
				path: "userdata",
				element: <UserData />,
				loader: fetchSubjects,
			},
			{
				path: "gpa",
				element: <GpaCalculator />,
			},
			{
				path: "addfile",
				element: <AddFile />,
			},
			{
				path: "addquiz",
				element: <AddQuiz />,
				loader: fetchSubjects,
			},
			{
				path: "qa",
				element: <QA />,
				loader: fetchQuestions,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthenticationPage />,
		errorElement: (
			<div className="col-span-2 row-span-2 ">
				<ErrorPage />
			</div>
		),
		action: authAction,
	},
	{
		path: "*",
		element: <ErrorPage />,
		errorElement: (
			<div className="col-span-2 row-span-2 ">
				<ErrorPage />
			</div>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
