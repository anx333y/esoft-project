import { GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridSlots, useGridApiRef } from "@mui/x-data-grid";
import Table from "../../../ui/Admin/Table/Table";
import { useAddQueueRowMutation, useChangeQueueRowMutation, useDeleteQueueRowMutation, useGetQueueQuery, useGetUsersQuery } from "../../../../http/mainApi";
import { useEffect, useMemo, useRef, useState } from "react";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import TableActionItem from "../../../ui/Admin/TableActionItem/TableActionItem";
import { toast } from "sonner";
import EditToolbar from "./EditToolbar";
import AddArrayQueueDialog from "../AddArrayQueueDialog/AddArrayQueueDialog";
import { handleFilterChange, handleRowEditStop, handleRowModesModelChange, handleSortModelChange } from "../../../../helpers/utils";

const QueueTable = () => {
	const apiRef = useGridApiRef();
	const [rows, setRows] = useState<any>(null);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const [filterOptions, setFilterOptions] = useState({});
	const [sortOptions, setSortOptions] = useState({});
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [editRow, setEditRow] = useState<GridRowId | null>(null);
	const [isOpenDialog, setIsOpenDialog] = useState(false);

	const { data, isSuccess, isLoading, isError, refetch } = useGetQueueQuery({
		page: paginationModel.page + 1,
		limit: paginationModel.pageSize,
		...filterOptions,
		...sortOptions
	});

	const {
		data: usersData,
		isSuccess: usersIsSuccess,
		isLoading: usersIsLoading,
		isError: usersIsError
	} = useGetUsersQuery({selectFields: ["id", "full_name"]});

	const [
		changeQueueRow,
		{
			isSuccess: changeQueueRowIsSuccess,
			isLoading: changeQueueRowIsLoading,
			isError: changeQueueRowIsError
		}
	] = useChangeQueueRowMutation();

	const [
		deleteQueueRow,
		{
			isSuccess: deleteQueueRowIsSuccess,
			isLoading: deleteQueueRowIsLoading,
			isError: deleteQueueRowIsError
		}
	] = useDeleteQueueRowMutation();

	const [
		addQueueRow,
		{
			isSuccess: addQueueRowIsSuccess,
			isLoading: addQueueRowIsLoading,
			isError: addQueueRowIsError
		}
	] = useAddQueueRowMutation();

	useEffect(() => {
		if (isSuccess) {
			setRows(data.rows);
		}
	}, [data, isSuccess])

	useEffect(() => {
		apiRef.current.autosizeColumns({
			includeOutliers: true,
			includeHeaders: true,
			outliersFactor: 1.5,
			expand: true
		})
	}, [apiRef.current, data, isSuccess])

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ [id]: { mode: GridRowModes.Edit } });
		setEditRow(id);
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		deleteQueueRow(String(id));
		if (rows) {
			setRows(rows.filter((row: any) => row.id !== id));
		}
		refetch();
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		if (newRow.id === -999) {
			addQueueRow({
				user_id: newRow.user_id,
				queue_date: newRow.queue_date,
				queue_time: newRow.queue_time,
				status: newRow.status
			});
			const updatedRow = {...newRow, _action: 'delete'};
			refetch();
			return updatedRow;
		}
		
		const updatedRow = { ...newRow, isNew: false };
		changeQueueRow({id: newRow.id, content: {user_id: newRow.user_id, status: newRow.status}});
		refetch();
		return updatedRow;
	};

	useEffect(() => {
		if (changeQueueRowIsError || deleteQueueRowIsError || addQueueRowIsError) {
			if (editRow) {
				setRowModesModel({ [editRow]: { mode: GridRowModes.Edit } });
			}
			toast.error('Ошибка!', {
				description: `Ошибка ${
					changeQueueRowIsError
						? "редактирования"
						: deleteQueueRowIsError
							? "удаления"
							: "добавления"
					} строки, попробуйте ещё раз`,
			});
		}
	}, [changeQueueRowIsError, deleteQueueRowIsError]);

	useEffect(() => {
		if (isError || usersIsError) {
			toast.error('Ошибка!', {
				description: `Ошибка получения данных, попробуйте обновить страницу`,
			});
		}
	}, [isError, usersIsError]);

	useEffect(() => {
		if (changeQueueRowIsSuccess || deleteQueueRowIsSuccess || addQueueRowIsSuccess) {
			changeQueueRowIsSuccess && setEditRow(null);
			toast.success('Успех!', {
				description: `Успешно ${
					changeQueueRowIsSuccess
						? "отредактирована"
						: deleteQueueRowIsSuccess
							? "удалена"
							: "добавлена"
						} строка`,
			});
		}
	}, [changeQueueRowIsSuccess, deleteQueueRowIsSuccess, addQueueRowIsSuccess])

	const updatedColumns: GridColDef[] = [
			{ field: 'id', type: "number", headerName: 'ID' },
			{ field: 'queue_date', type: "string", headerName: 'Дата', editable: true },
			{ field: 'queue_time', type: "string", headerName: 'Время', editable: true },
			{ field: 'user_id',
				type: "singleSelect",
				valueOptions:
					usersData
					? [{"value": -1, "label": 'Нет'}, ...usersData.map((row: {id: string, full_name: string}) => (
							{"value": row.id, "label": row.full_name}
						))]
					: [{"value": -1, "label": 'Нет'}],
				headerName: 'Пользователь',
				editable: true
			},
			{ field: 'status',
				type: "singleSelect",
				valueOptions: [
					{value: 'free', label: 'Свободно'},
					{value: 'booked', label: 'Забронировано'},
					{value: 'passed', label: 'Пройдено'},
					{value: 'missed', label: 'Пропущено'},
					{value: 'process', label: 'На приёме'}],
				headerName: 'Статус',
				editable: true },
			{
			field: 'actions',
			type: "actions",
			headerName: 'Действия',
			cellClassName: 'actions',
			getActions: ({id}) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
				if (isInEditMode || (rowModesModel[id] && (changeQueueRowIsLoading || changeQueueRowIsError))) {
					return [
						<TableActionItem
							icon={<Save />}
							label="Save"
							onClick={(handleSaveClick(id))}
							itemReason="save"
							isLoading={changeQueueRowIsLoading || addQueueRowIsLoading}
						/>,
						<TableActionItem
							icon={<Cancel />}
							label="Cancel"
							onClick={handleCancelClick(id)}
						/>,
					];
				}
			
				return [
					<TableActionItem
						icon={<Edit />}
						label="Edit"
						onClick={handleEditClick(id)}
					/>,
					<TableActionItem
						icon={<Delete />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						itemReason="delete"
						isLoading={deleteQueueRowIsLoading}
					/>,
				];
			}
		}];

	const rowCountRef = useRef(isSuccess ? data?.total : 0);

	const rowCount = useMemo(() => {
		if (!!data?.total) {
			rowCountRef.current = parseInt(data.total);
		}
		return rowCountRef.current;
	}, [data?.total]);

	return (
		<>
		<div className="admin-queue-table">
			<Table
				apiRef={apiRef}
				columns={updatedColumns}
				rows={isSuccess && usersIsSuccess && rows ? rows : []}
				rowCount={rowCount}
				loading={isLoading || usersIsLoading}
				paginationModel={paginationModel}
				onPaginationModelChange={setPaginationModel}
				onFilterModelChange={handleFilterChange(setFilterOptions)}
				onSortModelChange={handleSortModelChange(setSortOptions)}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange(setRowModesModel)}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slots={{
					toolbar: EditToolbar as GridSlots['toolbar'],
				}}
				slotProps={{
					toolbar: {
						setRows,
						setRowModesModel,
						setIsOpenDialog,
						columns: {user_id: -1, queue_date: '', queue_time: '', status: 'free'}
					},
				}}
			/>
		</div>
		<AddArrayQueueDialog open={isOpenDialog} setOpen={setIsOpenDialog} />
		</>
	)
};

export default QueueTable;