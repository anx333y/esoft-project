import "./OneNewsPage.css";

import OneNews from "../../components/bussiness/news/OneNews/OneNews";

import { useParams } from "react-router-dom";

const OneNewsPage = () => {
	const {newsId} = useParams();
	if (!newsId) {
		return;
	}
	return (
		<div className="one-news-page">
			<OneNews
				id={newsId}
			/>
		</div>
	)
};

export default OneNewsPage;