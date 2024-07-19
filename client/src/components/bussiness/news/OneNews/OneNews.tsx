import "./OneNews.css";
import styleConfig from "../../../../style.config";
import { CalendarToday } from "@mui/icons-material";

import { useEffect } from "react";

import Text from "../../../ui/Text/Text";
import Skeleton from "../../../ui/Skeleton/Skeleton";

import { toast } from "sonner";

import { useGetNewsByIdQuery } from "../../../../http/mainApi";

import { IOneNewsProps } from "../../../../types";



const OneNews = ({id}: IOneNewsProps) => {
	const {
		data,
		isLoading,
		isError
	} = useGetNewsByIdQuery(id);

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка!', {
				description: 'Ошибка загрузки новости, попробуйте перезагрузить страницу и попробовать снова'
			})
		}
	}, [isError]);

	if (isLoading || isError) {
		return (
			<Skeleton
				variant='rectangular'
				width="100%"
				height="400px"
				component={"div"}
				animation="wave"
				sx={{
					borderRadius: "10px"
				}}
			/>
		)
	}
	
	const date = new Date(data.created_at).toLocaleString().slice(0, -3);


	return (
		<div className="one-news">
			<div className="one-news-title-block">
				<div className="one-news-title">
					<Text
						sx={{
							textAlign: 'left',
							marginBottom: '8px'
						}}
					>
						{data.title}
					</Text>
				</div>
				<div className="one-news-date">
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
			</div>
			<div className="one-news-content">
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
					{data.content}
				</Text>
			</div>
		</div>
	)
};

export default OneNews;