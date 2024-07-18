import PDFLogo from "../assets/pdf-svgrepo-com.svg";
import { useState } from "react";
import Modal from "./Modal";

/* eslint-disable react/prop-types */
export default function File({ name, contentType, url }) {
	const isPDF = contentType === "application/pdf";
	const accessUrl = "http://localhost:3001/" + url;
	const clickHandler = () => {
		isPDF ? window.open(accessUrl) : setModalOpen(true);
	};
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className=" transition-all drop-shadow place-items-center hover:bg-sky-100 bg-neutral-100 rounded-3xl grid gap-y-2 grid-cols-1 grid-rows-3 p-4">
			<img
				className="row-span-2 w-28"
				src={isPDF ? PDFLogo : accessUrl}
			/>
			<p className="text-center w-40 text-ellipsis overflow-hidden">{name}</p>
			<button
				className=" bg-[#005cc8] text-white py-2 px-5 rounded-lg"
				onClick={clickHandler}
			>
				Open
			</button>

			{modalOpen && (
				<Modal
					setOpenModal={setModalOpen}
					url={accessUrl}
				/>
			)}
		</div>
	);
}
