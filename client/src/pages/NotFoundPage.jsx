import { Link } from "react-router-dom";

export const NotFoundPage = () => {

	return (
		<>
			<h2>Страница не найдена :(</h2>
			<Link to="/">Перейти на главную страницу</Link>
		</>
	)
};