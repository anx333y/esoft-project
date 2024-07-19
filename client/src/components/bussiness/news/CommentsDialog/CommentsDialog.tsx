import "./CommentsDialog.css";
import styleConfig from "../../../../style.config";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import CommentsList from "../CommentsList/CommentsList";
import CommentsAddForm from "../CommentsAddForm/CommentsAddForm";
import Button from "../../../ui/Button/Button";
import Text from "../../../ui/Text/Text";

import { ICommentsDialogProps } from "../../../../types";

const CommentsDialog = ({state, clearState}: ICommentsDialogProps) => {
	const handleClose = () => {
		clearState()
	};

	return (
		<div className="news-comments-dialog">
			<Dialog
				open={state.open}
				onClose={handleClose}
				PaperProps={{
					component: 'div',
					sx: {
						color: "secondary.main",
						padding: "20px",
						borderRadius: "10px",
						width: "40%"
					},
				}}
			>
				<DialogTitle
					sx={{
						textAlign: 'center',
						fontWeight: 400,
						fontSize: styleConfig.text["h4"]
					}}
				>
					Комментарии
				</DialogTitle>
				<DialogContent
					sx={{
						overflowY: 'visible'
					}}
				>
					<Text>
						{state.newsTitle}
					</Text>
				</DialogContent>
				<DialogContent>
					<CommentsList newsId={state.newsId}/>
				</DialogContent>
				<DialogContent
					sx={{
						overflowY: 'visible'
					}}
				>
					<CommentsAddForm newsId={state.newsId} />
				</DialogContent>
				<DialogActions>
					<Button onClickProp={handleClose}>Закрыть</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
};

export default CommentsDialog;