import "./UserCalendarDialog.css";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { useEffect, useState } from "react";

import Button from "../../../../ui/Button/Button";
import RHFInput from "../../../../ui/react-hook-form/RHFInput";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useAddUserCalendarMutation, useDeleteUserCalendarMutation, useValidateUserCalendarLinkMutation } from "../../../../../http/mainApi";

import { IUserCalendar, IUserCalendarDialogProps } from "../../../../../types";



const UserCalendarDialog = ({open, setOpen, link, userId}: IUserCalendarDialogProps) => {
	const {
		formState: {
			errors
		},
		handleSubmit,
		control,
		setValue
	} = useForm<IUserCalendar>({
		defaultValues: {
			link: ''
		},
		values: {
			link: link ? link : ''
		}
	});


	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		if (link) {
			setIsDisabled(true);
		}
	}, [link])

	const [
		deleteUserCalendar,
		{
			isLoading: deleteUserCalendarIsLoading,
			isSuccess: deleteUserCalendarIsSuccess,
			isError: deleteUserCalendarIsError
		}
	] = useDeleteUserCalendarMutation();

	const [
		addUserCalendar,
		{
			isLoading: addUserCalendarIsLoading,
			isSuccess: addUserCalendarIsSuccess,
			isError: addUserCalendarIsError
		}
	] = useAddUserCalendarMutation();

	const [
		validateUserCalendarLink,
		{
			isLoading: validateUserCalendarLinkIsLoading,
			isError: validateUserCalendarLinkIsError
		}
	] = useValidateUserCalendarLinkMutation();

	const handleClose = () => {
		setOpen(false);
	};

	const onDelete = async () => {
		if (!userId) {
			toast.error("Нет данных пользователя")
			return;
		}
		if (!link) {
			return;
		}
		await deleteUserCalendar({user_id: userId});
	};

	const onSubmitForm = async (data: IUserCalendar) => {
		if (!userId) {
			toast.error("Нет данных пользователя")
			return;
		}
		const formlink = data.link;
		if (!formlink) {
			return;
		}
		await addUserCalendar({user_id: userId, link: formlink});
	};
	
	const validateLink = async (link: string) => {
		const regex = /^(http|https):\/\/[^\s]+$/;
		if (!regex.test(link)) {
			return false;
		}
		const {data: validateUserCalendarLinkData} = await validateUserCalendarLink({link});
		return validateUserCalendarLinkData.result;
	};

	useEffect(() => {
		if (addUserCalendarIsSuccess) {
			setIsDisabled(true);
			handleClose();
			toast.success('Успех!', {
				description: 'Успешно обновлён пользовательский календарь'
			});
		}
	}, [addUserCalendarIsSuccess]);

	useEffect(() => {
		if (deleteUserCalendarIsSuccess) {
			setIsDisabled(false);
			setValue('link', '');
			handleClose();
			toast.success('Успех!', {
				description: 'Успешно удалён пользовательский календарь'
			});
		}
	}, [deleteUserCalendarIsSuccess])

	useEffect(() => {
		if (addUserCalendarIsError || deleteUserCalendarIsError) {
			toast.error('Ошибка!', {
				description: `Ошибка ${
					addUserCalendarIsError
						? 'обновления'
						: 'удаления'
					} пользовательского календаря, попробуйте ещё раз`
			})
		}
	}, [addUserCalendarIsError, deleteUserCalendarIsError]);

	useEffect(() => {
		if (validateUserCalendarLinkIsError) {
			toast.error('Ошибка!', {
				description: 'Ошибка валидации ссылки пользовательского календаря, проверьте ссылку и попробуйте ещё раз'
			})
		}
	}, [validateUserCalendarLinkIsError])

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
				<DialogTitle sx={{textAlign: 'center'}}>Пользовательский календарь</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{mb: "8px"}}>
						Вы можете подключить ваш календарь (Яндекс Календарь, Google Календарь и другие), введя в поле ниже ссылку iCal.
					</DialogContentText>
					<FormControl fullWidth margin="dense">
						<InputLabel htmlFor="ical" size="small">Ссылка iCal</InputLabel>
						<RHFInput
							name="link"
							control={control}
							errors={errors}
							rules={{
								validate: async (link: string) => (
									await validateLink(link) || 'Ссылка iCal недействительна или содержит ошибки'
								)
							}}
							renderComponent={
								<OutlinedInput
									autoFocus
									id="ical"
									name="ical"
									label="Ссылка iCal"
									type="text"
									fullWidth
									color="secondary"
									size="small"
									disabled={isDisabled}
									endAdornment={
										<InputAdornment position="end">
											<IconButton onClick={() => setIsDisabled(ds => !ds)}>
												<Edit fontSize="small" />
											</IconButton>
										</InputAdornment>
									}
								/>
							}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClickProp={handleClose}>Закрыть</Button>
					{
						link &&
						<Button
							onClickProp={onDelete}
							isLoading={deleteUserCalendarIsLoading}
						>
							Удалить каледнарь
						</Button>
					}
					<Button
						isLoading={
							addUserCalendarIsLoading
							|| validateUserCalendarLinkIsLoading
						}
						type="submit"
						>
							{link ? "Обновить календарь" : "Добавить календарь"}
						</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
};

export default UserCalendarDialog;