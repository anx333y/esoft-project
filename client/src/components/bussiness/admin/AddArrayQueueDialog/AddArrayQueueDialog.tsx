import "./AddArrayQueueDialog.css";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import Button from "../../../ui/Button/Button";
import AddArrayQueueDialogForm from "./AddArrayQueueDialogForm";

import { useAddQueueArrayMutation } from "../../../../http/mainApi";
import { IAddArrayQueueDialogProps } from "../../../../types";

const AddArrayQueueDialog = ({open, setOpen}: IAddArrayQueueDialogProps) => {
	const {
		formState: {
			errors
		},
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			startDate: '',
			selectDays: [0, 1, 2, 3, 4],
			startTime: '13:30:00',
			endTime: '17:00:00',
			delay: 3
		}
	});

	const [
		addQueueArray,
		{
			isLoading,
			isError,
			isSuccess
		}
	] = useAddQueueArrayMutation();

	const handleClose = () => {
		setOpen(false);
	};


	const onSubmitForm = async (data: any) => {
		addQueueArray(data);
	};

	useEffect(() => {
		if (isSuccess) {
			handleClose();
			toast.success('Успех!', {
				description: 'Успешно добавлены новые записи'
			});
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка!', {
				description: 'Ошибка добавления записей, попробуйте ещё раз'
			})
		}
	}, [isError])

	return (
		<div className="user-calendar-dialog">
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					sx: {
						color: "secondary.main",
						padding: "20px",
						borderRadius: "10px"
					},
					onSubmit: handleSubmit(async (data) => await onSubmitForm(data))
				}}
			>
				<DialogTitle
					sx={{
						textAlign: 'center'
					}}
				>
					Добавление записей на неделю
				</DialogTitle>
				<DialogContent>
					<AddArrayQueueDialogForm control={control} errors={errors} />
				</DialogContent>
				<DialogActions>
					<Button onClickProp={handleClose}>Закрыть</Button>
					<Button
						type="submit"
						isLoading={isLoading}
						>
							Добавить записи
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
};

export default AddArrayQueueDialog;