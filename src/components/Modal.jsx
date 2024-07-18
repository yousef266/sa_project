import { createPortal } from "react-dom";

// eslint-disable-next-line react/prop-types
function Modal({ setOpenModal, url }) {
	return createPortal(
		<div className=" h-screen w-screen fixed flex justify-center items-center z-10 bg-[#D4D4D8]">
			<div className=" h-[475px] w-[800px] bg-white relative top-8 shadow-lg flex flex-col p-6 justify-center rounded-xl">
				<div className="flex justify-end text-2xl font-bold transition-all duration-100 ">
					<button
						className=" cursor-pointer hover:text-red-800"
						onClick={() => {
							setOpenModal(false);
						}}
					>
						X
					</button>
				</div>
				<div className="max-w-4xl flex justify-center relative">
					<img src={url} />
				</div>
			</div>
		</div>,
		document.getElementById("imagePortal")
	);
}

export default Modal;
