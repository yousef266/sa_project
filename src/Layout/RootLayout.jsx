import { Outlet, useLocation, Navigate, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import BeatLoader from "react-spinners/BeatLoader";

const override = {
	display: "block",
	margin: "0 auto",
	borderColor: "black",
	position: "relative",
};

export default function RootLayout() {
	const location = useLocation();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	const user = JSON.parse(localStorage.getItem("user"));
	const isLogin = user && user._id !== "" && user._id !== null;

	return (
		<>
			{isLogin ? (
				<>
					<MainNavigation />
					<main style={{ gridColumn: 2, gridRow: 2 }}>
						{isLoading ? (
							<div className="h-full w-full flex justify-center items-center z-10 bg-[#D4D4D8]">
								<BeatLoader
									cssOverride={override}
									aria-label="Loading Spinner"
									data-testid="loader"
								/>
							</div>
						) : (
							<Outlet />
						)}
					</main>
				</>
			) : (
				<Navigate
					to="/auth?mode=login"
					state={{ from: location }}
					replace
				/>
			)}
		</>
	);
}
