import "./CommentsAddForm.css";
import { TextField } from "@mui/material";

import { useEffect } from "react";

import RHFInput from "../../../ui/react-hook-form/RHFInput";
import Button from "../../../ui/Button/Button";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useAddNewsCommentMutation } from "../../../../http/mainApi";

import { CommentFormValues, ICommentsAddFormProps } from "../../../../types";
import { useAppSelector } from "../../../../store/hook";


const CommentsAddForm = ({newsId}: ICommentsAddFormProps) => {
	const {
		formState: {
			errors
		},
		handleSubmit,
		control,
		setValue
	} = useForm();

	const userId = useAppSelector(state => state.user.id);

	const [
		addNewsComment,
		{
			isSuccess,
			isLoading,
			isError
		}
	] = useAddNewsCommentMutation();

	const onSubmitForm = (data: CommentFormValues) => {
		addNewsComment({
			"news_id": newsId,
			"author_id": userId,
			"content": data.comment
		});
	};

	useEffect(() => {
		if (isSuccess) {
			setValue("comment", "");
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка!', {
				description: 'Ошибка отправления комментария, попробуйте ещё раз'
			})
		}
	}, [isError])

	return (
		<form className="news-comments-add-form" onSubmit={handleSubmit(onSubmitForm)}>
			<RHFInput
				name="comment"
				control={control}
				placeholder="Написать комментарий..."
				rules={{
					required: "Комментарий не может быть пустым"
				}}
				defaultValue=""
				renderComponent={
					<TextField
						color="secondary"
						variant="outlined"
						size="small"
						multiline
						fullWidth
						inputProps={{
							sx: {
								fontSize: '10px'
							}
						}}
						helperText={errors && `${errors.comment?.message || ""}`}
					/>
				}
			/>
			<Button type="submit" isLoading={isLoading}>Отправить</Button>
		</form>
	)
};

export default CommentsAddForm;