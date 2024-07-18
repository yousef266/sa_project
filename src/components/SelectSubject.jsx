import Error from "./Error";
import useFetch from "../hooks/useFetch";
import { fetchSubjects } from "../util/http";

export default function SelectSubject() {
	const { error, fetchedData: subjects } = useFetch(fetchSubjects, []);
	//
	if (error) {
		return (
			<Error
				title="An error occurred!"
				message={error.message}
			/>
		);
	}

	return (
		<select
			name="dir"
			id="dir"
			required
			className=" text-lg py-4 pl-5 pr-28 border-2 border-[#D4D4D8] rounded cursor-pointer"
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
	);
}
