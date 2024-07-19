import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { Dispatch } from "react";

import { INewsDialogState } from "./NewsTable";

type EditToolbarProps = {
	setDialog: Dispatch<INewsDialogState>;
}

const EditToolbar = ({ setDialog }: EditToolbarProps) => {
	const handleClickAdd = () => {
		setDialog({
			open: true,
			row: null,
			type: 'add'
		})
	};

	return (
		<GridToolbarContainer sx={{padding: "8px 16px"}}>
			<Button color="secondary" startIcon={<Add />} onClick={handleClickAdd}>
				Добавить новость
			</Button>
		</GridToolbarContainer>
	);
}

export default EditToolbar;