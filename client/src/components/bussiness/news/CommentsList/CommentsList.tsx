import "./CommentsList.css";
import { CircularProgress } from "@mui/material";

import { useEffect } from "react";

import Comment from "../Comment/Comment";

import { toast } from "sonner";

import { useGetNewsCommentsByNewsIdQuery } from "../../../../http/mainApi";

import { ICommentsListProps, INewsComment } from "../../../../types";

const CommentsList = ({newsId}: ICommentsListProps) => {
	const {
		data,
		isLoading,
		isError
	} = useGetNewsCommentsByNewsIdQuery(newsId, {skip: !newsId,});

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка!', {
				description: 'Ошибка загрузки комментариев, попробуйте перезагрузить страницу и попробовать снова'
			})
		}
	}, [isError])

	if (isLoading) {
		return (
			<div className="news-comments-list-helper">
				<CircularProgress color="secondary" />
			</div>
		)
	}

	if (!data.length) {
		return (
			<div className="news-comments-list-helper">
				Комментариев нема :(
			</div>
		)
	}

	return (
		<div className="news-comments-list">
			{
				data.map((newsComment: INewsComment) => (
					<Comment
						key={newsComment.id}
						userName={newsComment.full_name || ''}
						content={newsComment.content || ''}
						createdAt={newsComment.created_at || ''}
					/>
				))
			}
		</div>
	)
};

export default CommentsList;