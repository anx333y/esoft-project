import { GridColDef, GridEventListener, GridFilterModel, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridSlots, GridSortModel, useGridApiRef } from "@mui/x-data-grid";
import Table from "../../../ui/Admin/Table/Table";
import { useAddQueueRowMutation, useChangeQueueRowMutation, useDeleteQueueRowMutation, useGetQueueQuery, useGetUsersQuery } from "../../../../http/adminApi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "../../../../store/hook";
import { accessErrorAnalyzer } from "../../../../store/userSlice";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import TableActionItem from "../../../ui/Admin/TableActionItem/TableActionItem";
import { toast } from "sonner";
import EditToolbar from "../../../ui/Admin/EditToolbar/EditToolbar";

const QueueTable = () => {
	const dispatch = useAppDispatch();
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

	const { data, isSuccess, isLoading, isError, error, refetch } = useGetQueueQuery({
		page: paginationModel.page + 1,
		limit: paginationModel.pageSize,
		...filterOptions,
		...sortOptions
	});
	console.log(filterOptions)

	const {
		data: usersData,
		isSuccess: usersIsSuccess,
		isLoading: usersIsLoading,
		isError: usersIsError,
		error: usersError
	} = useGetUsersQuery({selectFields: ["id", "full_name"]});

	const [
		changeQueueRow,
		{
			isSuccess: changeQueueRowIsSuccess,
			isLoading: changeQueueRowIsLoading,
			isError: changeQueueRowIsError,
			error: changeQueueRowError
		}
	] = useChangeQueueRowMutation();

	const [
		deleteQueueRow,
		{
			isSuccess: deleteQueueRowIsSuccess,
			isLoading: deleteQueueRowIsLoading,
			isError: deleteQueueRowIsError,
			error: deleteQueueRowError
		}
	] = useDeleteQueueRowMutation();

	const [
		addQueueRow,
		{
			isSuccess: addQueueRowIsSuccess,
			isLoading: addQueueRowIsLoading,
			isError: addQueueRowIsError,
			error: addQueueRowError
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

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

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

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	useEffect(() => {
		if (changeQueueRowIsError || deleteQueueRowIsError || addQueueRowIsError) {
			if (editRow) {
				setRowModesModel({ [editRow]: { mode: GridRowModes.Edit } });
			}
			toast.error('Ошибка!', {
				description: `Ошибка ${changeQueueRowIsError ? "редактирования" : deleteQueueRowIsError ? "удаления" : "добавления"} строки, попробуйте ещё раз`,
			});
		}
	}, [changeQueueRowIsError, deleteQueueRowIsError])

	useEffect(() => {
		if (changeQueueRowIsSuccess || deleteQueueRowIsSuccess || addQueueRowIsSuccess) {
			changeQueueRowIsSuccess && setEditRow(null);
			toast.success('Успех!', {
				description: `Успешно ${changeQueueRowIsSuccess ? "отредактирована" : deleteQueueRowIsSuccess ? "удалена" : "добавлена"} строка`,
			});
		}
	}, [changeQueueRowIsSuccess, deleteQueueRowIsSuccess])

	const updatedColumns: GridColDef[] = [
			{ field: 'id', type: "number", headerName: 'ID' },
			{ field: 'queue_date', type: "string", headerName: 'Дата', editable: true },
			{ field: 'queue_time', type: "string", headerName: 'Время', editable: true },
			{ field: 'user_id',
				type: "singleSelect",
				valueOptions:
					usersData
					? [{"value": -1, "label": ''}, ...usersData.map((row: {id: string, full_name: string}) => (
							{"value": row.id, "label": row.full_name}
						))]
					: [{"value": -1, "label": ''}],
				headerName: 'Пользователь',
				editable: true
			},
			{ field: 'status', type: "boolean", headerName: 'Забронировано', editable: true },
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

	const handleFilterChange = useCallback((filterModel: GridFilterModel) => {
		const filterInfo = filterModel.items[0] || null;
		if (filterInfo && filterInfo.field && filterInfo.value) {
			setFilterOptions({filterField: filterInfo.field, filterValue: filterInfo.value});
		} else {
			setFilterOptions({});
		}
	}, []);

	const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
		const sortInfo = sortModel[0] || null;
		if (sortInfo && sortInfo.field && sortInfo.sort) {
			setSortOptions({sortField: sortInfo.field, sort: sortInfo.sort});
		} else {
			setSortOptions({});
		}
	}, []);

	useEffect(() => {
		if (isError || usersIsError || changeQueueRowIsError || deleteQueueRowIsError || addQueueRowIsError) {
			dispatch(accessErrorAnalyzer(error || usersError || changeQueueRowError || deleteQueueRowError || addQueueRowError));
		}
	}, [isError, usersIsError, changeQueueRowIsError, deleteQueueRowIsError, addQueueRowIsError])

	const rowCountRef = useRef(isSuccess ? data?.total : 0);

	const rowCount = useMemo(() => {
		if (!!data?.total) {
			rowCountRef.current = parseInt(data.total);
		}
		return rowCountRef.current;
	}, [data?.total]);

	return (
		<div className="admin-queue-table">
			<Table
				apiRef={apiRef}
				columns={updatedColumns}
				rows={isSuccess && usersIsSuccess && rows ? rows : []}
				rowCount={rowCount}
				loading={isLoading || usersIsLoading}
				paginationModel={paginationModel}
				onPaginationModelChange={setPaginationModel}
				onFilterModelChange={handleFilterChange}
				onSortModelChange={handleSortModelChange}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slots={{
					toolbar: EditToolbar as GridSlots['toolbar'],
				}}
				slotProps={{
					toolbar: { setRows, setRowModesModel, columns: {user_id: -1, queue_date: '', queue_time: ''} },
				}}
			/>
		</div>
	)
};

export default QueueTable;