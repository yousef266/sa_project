import Folder from "../components/Folder";

export default function Folders() {
	const user = JSON.parse(localStorage.getItem("user"));
	const subjectsObj = user.subjects;
	const subjects = Object.values(subjectsObj);
	return (
		<div className=" grid md:grid-cols-5 grid-cols-2 gap-4 p-8">
			{subjects.map((subject) => (
				<Folder
					key={subject.name}
					name={subject.name}
				/>
			))}
		</div>
	);
}
