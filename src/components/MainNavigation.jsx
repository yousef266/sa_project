import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { CiFileOn, CiSquareCheck } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { RiQuestionAnswerLine } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
function MainNavigation() {
	const [showAddIcons, setShowAddIcons] = useState(false);
	const def =
		"transition-all text-center flex items-center duration-200 w-12 h-12 rounded-full hover:bg-[#005CC8] hover:text-white";
	const active = def + " bg-[#005CC8] text-white";
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));
	const isAdmin = user.isAdmin;
	const addStyle = isAdmin
		? "transition-all relative flex justify-center cursor-pointer font-bold text-3xl text-white"
		: "hidden";

	let quizIconsStyle = showAddIcons ? "top-[-90px] " : "invisible top-0";
	let fileIconsStyle = showAddIcons ? "top-[-50px] " : "invisible top-0";

	function addClickHandler() {
		setShowAddIcons((state) => !state);
	}

	function fileClickHandler() {
		navigate("/addfile");
	}

	function quizClickHandler() {
		navigate("/addquiz");
	}

	function logoutClickHandler() {
		localStorage.removeItem("user");
		navigate("/auth?mode=login");
	}

	return (
		<>
			<header className="z-20 flex p-4 bg-[#fafafa] border-solid border-2 border-black col-span-full justify-between">
				<NavLink
					to={""}
					className="mx-3 font-extrabold text-2xl text-center flex items-center"
				>
					<p>Studently</p>
				</NavLink>
				<div className="flex justify-between">
					<p
						className={`text-white bg-[#005CC8] text-center flex items-center w-16 rounded-xl`}
					>
						<p className=" w-full">{user.points}</p>
					</p>
					<button
						onClick={logoutClickHandler}
						className="transition-all mx-3 px-3 text-lg text-white rounded-xl bg-[#005cc8] hover:bg-[#004a9e]"
					>
						Logout
					</button>
				</div>
			</header>

			<header className=" justify-between z-10 flex flex-col max-w-4xl p-7 bg-[#fafafa] border-solid border-x-2 border-black col-span-1 row-start-2 ">
				<nav>
					<ul className="flex flex-col items-center gap-4">
						<li>
							<NavLink
								to="/gpa"
								className={`text-white bg-[#005CC8] ${def}`}
							>
								<p className=" w-full">{user.totalGpa}</p>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/files"
								className={({ isActive }) => (isActive ? active : def)}
							>
								<CiFolderOn className="w-full text-2xl" />
							</NavLink>
						</li>
						<li>
							<NavLink
								to="userdata"
								className={({ isActive }) => (isActive ? active : def)}
							>
								<CiUser className="w-full text-2xl" />
							</NavLink>
						</li>
						<li>
							<NavLink
								to="qa"
								className={({ isActive }) => (isActive ? active : def)}
							>
								<RiQuestionAnswerLine className="w-full text-2xl" />
							</NavLink>
						</li>
					</ul>
				</nav>
				<div
					onClick={addClickHandler}
					className={addStyle}
				>
					<div
						onClick={fileClickHandler}
						className={
							"z-10 duration-300 transform transition-all p-1 cursor-pointer text-2xl text-white bg-[#005cc8] hover:bg-[#004a9e] rounded-lg absolute " +
							fileIconsStyle
						}
					>
						<CiFileOn />
					</div>
					<div
						onClick={quizClickHandler}
						className={
							" z-10 duration-300 transform transition-all p-1 cursor-pointer text-2xl text-white bg-[#005cc8] hover:bg-[#004a9e] rounded-lg absolute " +
							quizIconsStyle
						}
					>
						<CiSquareCheck />
					</div>
					<IoAddOutline className="z-20 transition-all w-24 h-[40px] bg-[#005cc8] hover:bg-[#004a9e] rounded-lg " />
				</div>
			</header>
		</>
	);
}

export default MainNavigation;
