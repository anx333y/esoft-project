import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer } from "@mui/x-data-grid";

import { Dispatch } from "react";

interface EditToolbarProps {
	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
	) => void;
	columns: {[key: string]: string | number | boolean };
	setIsOpenDialog: Dispatch<boolean>;
}

const EditToolbar = (props: EditToolbarProps) => {
	const { setRows, setRowModesModel, setIsOpenDialog } = props;
	const id = -999;
	const handleClickAddOne = () => {
		setRows((oldRows) => [{ id, isNew: true, ...props.columns }, ...oldRows]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'queue_date' },
		}));
	};

	const handleClickAddArray = () => {
		setIsOpenDialog(true);
	};

	return (
		<GridToolbarContainer sx={{padding: "8px 16px"}}>
			<Button color="secondary" startIcon={<Add />} onClick={handleClickAddOne}>
				Добавить запись
			</Button>
			<Button color="secondary" startIcon={<Add />} onClick={handleClickAddArray}>
				Добавить записи на неделю
			</Button>
		</GridToolbarContainer>
	);
}

export default EditToolbar;