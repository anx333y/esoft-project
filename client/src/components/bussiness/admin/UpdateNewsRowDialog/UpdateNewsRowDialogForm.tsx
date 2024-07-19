import { TextField } from "@mui/material";

import RHFInput from "../../../ui/react-hook-form/RHFInput";

const UpdateNewsRowDialogForm = ({control, errors}: any) => {
	return (
		<form className="update-news-row-dialog-form">
			<RHFInput
				name="title"
				control={control}
				errors={errors}
				renderComponent={
					<TextField
						color="secondary"
						margin="dense"
						label="Заголовок"
						fullWidth
					/>
				}
			/>
			<RHFInput
				name="content"
				control={control}
				errors={errors}
				renderComponent={
					<TextField
						color="secondary"
						margin="dense"
						label="Содержимое"
						fullWidth
						multiline
					/>
				}
			/>
		</form>
	)
};

export default UpdateNewsRowDialogForm;