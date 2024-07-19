import "./Comment.css";
import styleConfig from "../../../../style.config";

import Text from "../../../ui/Text/Text";

import { ICommentProps } from "../../../../types";



const Comment = ({userName, content, createdAt}: ICommentProps) => {
	const date = new Date(createdAt).toLocaleString().slice(0, -3);

	return (
		<div className="news-comment">
			<div
				className="news-comment-avatar"
				style={{
					backgroundColor: styleConfig.colors.error.main
				}}
			>
			</div>
			<div className="news-comment-main">
				<div className="news-comment-name">
					<Text
						font="h5"
						component="h5"
						sx={{
							textAlign: 'left'
						}}
					>
						{userName}
					</Text>
				</div>
				<div className="news-comment-content">
					<Text
						variant="caption"
						font="h5"
						component="span"
						sx={{
							fontWeight: 400,
							whiteSpace: 'pre-line'
						}}
					>
						{content}
					</Text>
				</div>
				<div className="news-comment-date">
					<Text
						font="h6"
						component="span"
						sx={{
							fontWeight: 400
						}}
					>
						{date}
					</Text>
				</div>
			</div>
		</div>
	)
};

export default Comment;