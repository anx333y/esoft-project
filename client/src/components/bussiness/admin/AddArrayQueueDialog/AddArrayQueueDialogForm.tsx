import "./AddArrayQueueDialog.css";
import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";

import { isValidDate, isValidTime } from "../../../../helpers/utils";
import { days } from "../../../../helpers/constants";

import RHFInput from "../../../ui/react-hook-form/RHFInput";

const AddArrayQueueDialogForm = ({control, errors}: any) => {
	return (
		<>
			<div className="add-array-queue-dialog-form-input-group">
			<FormControl fullWidth margin="dense">
				<InputLabel htmlFor="startDate" size="small">Дата старта</InputLabel>
				<RHFInput
					name="startDate"
					control={control}
					errors={errors}
					rules={{
						validate: (startDate) => (
							startDate
								? isValidDate(startDate) || 'Такой даты не существует'
								: true
						)
					}}
					isRequired={false}
					renderComponent={
						<Input
							name="startDate"
							color="secondary"
						/>
					}
				/>
			</FormControl>
			<FormControl fullWidth margin="dense">
				<InputLabel htmlFor="startTime" size="small">Время начала</InputLabel>
				<RHFInput
					name="startTime"
					control={control}
					errors={errors}
					rules={{
						validate: (startTime) => (
							isValidTime(startTime) || 'Такого времени не существует'
						)
					}}
					renderComponent={
						<Input
							name="startTime"
							color="secondary"
						/>
					}
				/>
			</FormControl>
			<FormControl fullWidth margin="dense">
				<InputLabel htmlFor="endTime" size="small">Время конца</InputLabel>
				<RHFInput
					name="endTime"
					control={control}
					errors={errors}
					rules={{
						validate: (startTime) => (
							isValidTime(startTime) || 'Такого времени не существует)'
						)
					}}
					renderComponent={
						<Input
							name="endTime"
							color="secondary"
						/>
					}
				/>
			</FormControl>
			<FormControl fullWidth margin="dense">
				<InputLabel htmlFor="delay" size="small">Промежуток (мин.)</InputLabel>
				<RHFInput
					name="delay"
					control={control}
					errors={errors}
					rules={{
						pattern: {
							value: /^\d+(\.\d+)?$/,
							message: 'Неверный промежуток'
						},
					}}
					renderComponent={
						<Input
							name="delay"
							type="number"
							color="secondary"
						/>
					}
				/>
			</FormControl>
			</div>
			<FormControl fullWidth margin="dense">
				<InputLabel htmlFor="selectDays" size="small">Заполняемые дни недели</InputLabel>
				<RHFInput
					name="selectDays"
					control={control}
					errors={errors}
					rules={{
						minLength: {
							value: 1,
							message: 'Выберите минимум 1 день недели'
						}
					}}
					renderComponent={
						<Select
							name="selectDays"
							multiple={true}
							input={<Input />}
							color="secondary"
						>
							{
								days.map((day, index) => (
									<MenuItem key={index} value={index}>
										{day}
									</MenuItem>
								))
							}
						</Select>
					}
				/>
			</FormControl>
		</>
	)
};

export default AddArrayQueueDialogForm;