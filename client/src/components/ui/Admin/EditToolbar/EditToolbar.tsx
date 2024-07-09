import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer } from "@mui/x-data-grid";

interface EditToolbarProps {
	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
	) => void;
	columns: {[key: string]: string | number | boolean }
}

const EditToolbar = (props: EditToolbarProps) => {
	const { setRows, setRowModesModel } = props;
	const id = -999;
	const handleClick = () => {
		setRows((oldRows) => [{ id, isNew: true, ...props.columns }, ...oldRows]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'queue_date' },
		}));
	};

	return (
		<GridToolbarContainer sx={{padding: "8px 16px"}}>
			<Button color="secondary" startIcon={<Add />} onClick={handleClick}>
				Добавить запись
			</Button>
		</GridToolbarContainer>
	);
}

export default EditToolbar;