import "./NewsList.css";
import { Masonry } from "@mui/lab";

import { useEffect, useState } from "react";

import NewsCard from "../NewsCard/NewsCard";
import CommentsDialog from "../CommentsDialog/CommentsDialog";
import NewsQuickSearchForm from "../NewsQuickSearchForm/NewsQuickSearchForm";
import Skeleton from "../../../ui/Skeleton/Skeleton";

import { toast } from "sonner";

import { useGetAllNewsQuery } from "../../../../http/mainApi";

import { INews } from "../../../../types";

export type ICommentsDialogState = {
	open: boolean,
	newsId: string,
	newsTitle: string
};

export const dialogInitialState = {
	open: false,
	newsId: '',
	newsTitle: ''
}

export type IQuickSearchParams = {
	quickSearchValue: string;
}

const NewsList = () => {
	const [dialog, setDialog] = useState(dialogInitialState);
	const [quickSearchParams, setQuickSearchParams] = useState<IQuickSearchParams | null>(null);

	const {
		data,
		isSuccess,
		isLoading,
		isError
	} = useGetAllNewsQuery(quickSearchParams?.quickSearchValue ? quickSearchParams : {});

	const clearDialogState = () => {
		setDialog(dialogInitialState);
	};

	const openDialog = (newsId: string, newsTitle: string) => () => {
		setDialog({
			open: true,
			newsId,
			newsTitle
		})
	};

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка!', {
				description: 'Ошибка загрузки новостей, попробуйте перезагрузить страницу и попробовать снова'
			})
		}
	}, [isError])

	if (isLoading) {
		return (
			<>
				<Skeleton
						variant='rectangular'
						width="200px"
						height="32px"
						component={"div"}
						animation="wave"
						sx={{
							borderRadius: "10px"
						}}
				/>
				<div className="news-list">
					<Masonry columns={3} spacing={2} sequential >
					{ [0, 1, 2, 3, 4, 5].map((_) => (
						<Skeleton
							variant='rectangular'
							height="200px"
							component={"div"}
							animation="wave"
							sx={{
								borderRadius: "10px"
							}}
						/>
					)) }
				</Masonry>
			</div>
			</>
		)
	}

	return (
		<>
		<NewsQuickSearchForm setQuickSearchParams={setQuickSearchParams} />
		<div className="news-list">
			{ isSuccess &&
				<Masonry columns={3} spacing={2} sequential >
				{ data.map((news: INews) => (
					<NewsCard
						key={news.id}
						id={news.id || ''}
						title={news.title || ''}
						content={news.content || ''}
						commentsCount={news.news_comments_count || ''}
						createdAt={news.created_at || ''}
						openDialog={openDialog(news.id || '', news.title || '')}
					/>
				)) }
				</Masonry>
			}
		</div>
		<CommentsDialog state={dialog} clearState={clearDialogState} />
		</>
	)
};

export default NewsList;