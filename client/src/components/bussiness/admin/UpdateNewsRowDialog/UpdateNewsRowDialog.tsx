import "./UpdateNewsRowDialog.css";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { useEffect } from "react";

import Button from "../../../ui/Button/Button";
import UpdateNewsRowDialogForm from "./UpdateNewsRowDialogForm";

import { useAddNewsMutation, useChangeNewsRowMutation } from "../../../../http/mainApi";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { INews, IUpdateNewsRowDialogProps } from "../../../../types";
import { useAppSelector } from "../../../../store/hook";

const UpdateNewsRowDialog = ({dialogState, clearDialogState}: IUpdateNewsRowDialogProps) => {
	const {
		formState: {
			errors
		},
		handleSubmit,
		control,
	} = useForm({
		values: {
			title: dialogState.row?.title || '',
			content: dialogState.row?.content || ''
		}
	});

	const userId = useAppSelector(state => state.user.id);

	const [
		addNews,
		{
			isLoading: addNewsIsLoading,
			isError: addNewsIsError,
			isSuccess: addNewsIsSuccess
		}
	] = useAddNewsMutation();

	const [
		changeNewsRow,
		{
			isLoading: changeNewsRowIsLoading,
			isError: changeNewsRowIsError,
			isSuccess: changeNewsRowIsSuccess
		}
	] = useChangeNewsRowMutation();

	const handleChangeNews = (data: INews) => {
		if (dialogState.row && dialogState.row.id) {
			changeNewsRow({id: dialogState.row.id, content: data });
		}
	};

	const handleAddNews = (data: INews) => {
		addNews({
			author_id: userId,
			title: data.title,
			content: data.content
		})
	};

	const handleClose = () => {
		clearDialogState();
	};

	const onSubmitForm = async (data: INews) => {
		if (dialogState.type === 'update') {
			handleChangeNews(data);
			return;
		}

		if (dialogState.type === 'add') {
			handleAddNews(data);
			return;
		}
	};

	useEffect(() => {
		if (changeNewsRowIsSuccess || addNewsIsSuccess) {
			handleClose();
			toast.success('Успех!', {
				description: `Успешно ${
					addNewsIsSuccess
						? "добавлена"
						: "изменена"
					} новость`
			});
		}
	}, [changeNewsRowIsSuccess, addNewsIsSuccess]);

	useEffect(() => {
		if (changeNewsRowIsError || addNewsIsError) {
			toast.error('Ошибка!', {
				description: `Ошибка ${
					addNewsIsError
						? "добавления"
						: "изменения"
					} новости, попробуйте ещё раз`
			})
		}
	}, [changeNewsRowIsError, addNewsIsError])

	
	if (!dialogState.row && dialogState.type === 'update') {
		return;
	}

	return (
		<div className="update-news-row-dialog">
			<Dialog
				open={dialogState.open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					sx: {
						color: "secondary.main",
						padding: "20px",
						borderRadius: "10px",
						minWidth: "50%"
					},
					onSubmit: handleSubmit(async (data) => await onSubmitForm(data))
				}}
			>
				<DialogTitle sx={{textAlign: 'center'}}>
					{
						dialogState.type === 'update'
							? "Изменение новости"
							: "Добавить новость"
					}
				</DialogTitle>
				<DialogContent>
					<UpdateNewsRowDialogForm control={control} errors={errors} />
				</DialogContent>
				<DialogActions>
					<Button onClickProp={handleClose}>Закрыть</Button>
					<Button
						type="submit"
						isLoading={changeNewsRowIsLoading || addNewsIsLoading}
						>
							{
								dialogState.type === 'update'
									? "Изменить новость"
									: "Добавить новость"
							}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
};

export default UpdateNewsRowDialog;