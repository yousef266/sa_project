// eslint-disable-next-line react/prop-types
function PageContent({ title, children }) {
	return (
		<div className="text-center m-20">
			<h1 className="text-2xl font-bold">{title}</h1>
			{children}
		</div>
	);
}

export default PageContent;
