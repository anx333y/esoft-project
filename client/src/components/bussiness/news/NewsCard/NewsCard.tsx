import "./NewsCard.css";
import styleConfig from "../../../../style.config";
import { Button, lighten } from "@mui/material";
import { CalendarToday, Comment } from "@mui/icons-material";

import Text from "../../../ui/Text/Text";

import { useNavigate } from "react-router-dom";

import { getCommentForm } from "../../../../helpers/utils";
import { INewsCardProps } from "../../../../types";

const NewsCard = ({id, title, content, createdAt, commentsCount, openDialog}: INewsCardProps) => {
	const navigate = useNavigate();
	const date = new Date(createdAt).toLocaleString().slice(0, -3);

	const onClick = () => {
		navigate(`/news/${id}`)
	};

	return (
		<div className="news-card">
			<div className="news-card-above-title-info">
				<div
					className="news-card-date"
					style={{
						borderRight: `1px solid ${styleConfig.colors.secondary.dark}`,
						paddingRight: "16px"
					}}
				>
					<Text
						font="h6"
						component="span"
						sx={{
							fontWeight: 400
						}}
					>
						<CalendarToday sx={{fontSize: 'inherit'}} /> {date}
					</Text>
				</div>
				<div className="news-card-count-comments">
				<Text
						font="h6"
						component="span"
						sx={{
							fontWeight: 400,
							"&:hover": {
								textDecoration: 'underline',
								cursor: 'pointer'
							}
						}}
						onClick={openDialog}
					>
						<Comment sx={{fontSize: 'inherit'}} /> {getCommentForm(Number(commentsCount))}
					</Text>
				</div>
			</div>
			<div className="news-card-title">
				<Text
					font="h2"
					component="h2"
					sx={{
						fontWeight: 400,
						textAlign: 'left',
					}}
				>
					{title}
				</Text>
			</div>
			<div className="news-card-content">
				<Text
					font="h4"
					component="p"
					sx={{
						color: styleConfig.colors.primary.dark,
						fontWeight: 300,
						textAlign: 'left',
						wordSpacing: -2
					}}
				>
					{content}
				</Text>
			</div>
			<div className="news-card-bottom">
				<div className="news-card-author">
					<Text
						font="h6"
						component="span"
						sx={{
							fontWeight: 400
						}}
					>
						Миграционная служба ТюмГУ
					</Text>
				</div>
				<div className="news-card-read-more-button">
					<Button
						color="secondary"
						variant="contained"
						onClick={onClick}
						sx={{
							fontSize: styleConfig.text["h5"],
							"&:hover": {
								bgcolor: lighten(styleConfig.colors.secondary.dark, 0.2)
							}
						}}
					>
						Читать далее
					</Button>
				</div>
			</div>
		</div>
	)
};

export default NewsCard;