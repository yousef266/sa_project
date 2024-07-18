import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../util/http";

export default function GpaCalculator() {
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState("");

	let user = JSON.parse(localStorage.getItem("user"));
	const subjectsObj = user.subjects;
	const subjects = Object.values(subjectsObj);

	const isValidGrade = (grade) => {
		const validGrades = ["A", "A+", "B", "B+", "C", "C+", "D", "D+", "F"];
		return validGrades.includes(grade.toUpperCase());
	};

	const calculateGradePoints = (grade) => {
		switch (grade.toUpperCase()) {
			case "A+":
				return 4.0;
			case "A":
				return 3.75;
			case "B+":
				return 3.4;
			case "B":
				return 3.1;
			case "C+":
				return 2.8;
			case "C":
				return 2.5;
			case "D+":
				return 2.25;
			case "D":
				return 2.0;
			case "F":
				return 1.0;
			default:
				return 0.0;
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const subject = new FormData(e.target);
		const data = Object.values(Object.fromEntries(subject.entries()));
		let totalCreditsValue = 0;
		let totalGradePointsValue = 0;
		let i = 0;
		let error = false;
		data.forEach((grade) => {
			let hours = subjects[i++].hours;
			if (!grade || !isValidGrade(grade)) {
				setErrorMessage("Please enter valid grades for all subjects.");
				error = true;
			}
			const gradePoints = calculateGradePoints(grade);

			const coursePoints = hours * gradePoints;

			totalGradePointsValue += coursePoints;
			totalCreditsValue += +hours;
		});
		if (!error) {
			setErrorMessage("");
			// past GPA
			let lastTotalGrade = user.totalGpa * user.totalHours;
			// past GPA + new
			let totalGrade = lastTotalGrade + totalGradePointsValue;
			// total Hours
			let totalHours = totalCreditsValue + user.totalHours;
			let totalGpa = parseFloat(
				(totalGrade / (totalCreditsValue + user.totalHours)).toFixed(2)
			);
			const obj = { totalHours, totalGpa };
			user = { ...user, ...obj };
			console.log(user);
			localStorage.setItem("user", JSON.stringify(user));
			updateUser(user);
			navigate("/");
		}
	};

	return (
		<div className="flex flex-col items-center mx-auto my-3">
			<h1 style={{ textAlign: "center", margin: "5px" }}>
				Choose Your Subjects!
			</h1>
			<form
				className=" w-[450px] p-6 rounded-2xl border-solid border-2 border-black flex flex-col gap-1 bg-[#fafafa]"
				onSubmit={submitHandler}
			>
				{subjects.map((sub) => (
					<div
						key={sub.name}
						className="grid grid-cols-3 items-center"
					>
						<label
							className="col-span-1 font-bold"
							htmlFor={sub.name}
						>
							{`${sub.name} :`}
						</label>
						<input
							placeholder="Valid Input (A, B, C, D, F)"
							className="m-1 text-[18px] p-2 bg-transparent col-span-2 "
							type="text"
							id={sub.name}
							name={sub.name}
							required
						/>
					</div>
				))}
				<button className="transition-all text-white bg-[#005cc8] px-3 py-2 text-lg uppercase rounded-xl cursor-pointer hover:bg-[#004a9e]">
					Calculate GPA
				</button>
			</form>

			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
		</div>
	);
}
