import { GridColDef, GridEventListener, GridFilterModel, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridSortModel, useGridApiRef } from "@mui/x-data-grid";
import Table from "../../../ui/Admin/Table/Table";
import { useChangeUserMutation, useDeleteUserMutation, useGetUsersQuery } from "../../../../http/adminApi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "../../../../store/hook";
import { accessErrorAnalyzer } from "../../../../store/userSlice";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import TableActionItem from "../../../ui/Admin/TableActionItem/TableActionItem";
import { toast } from "sonner";

const UsersTable = () => {
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

	const { data, isSuccess, isLoading, isError, error, refetch } = useGetUsersQuery({
		page: paginationModel.page + 1,
		limit: paginationModel.pageSize,
		...filterOptions,
		...sortOptions
	});

	const [
		changeUser,
		{
			isSuccess: changeUserIsSuccess,
			isLoading: changeUserIsLoading,
			isError: changeUserIsError,
			error: changeUserError
		}
	] = useChangeUserMutation();

	const [
		deleteUser,
		{
			isSuccess: deleteUserIsSuccess,
			isLoading: deleteUserIsLoading,
			isError: deleteUserIsError,
			error: deleteUserError
		}
	] = useDeleteUserMutation();

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
		deleteUser(String(id));
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
		const updatedRow = { ...newRow, isNew: false };
		changeUser({id: newRow.id, content: {full_name: newRow.full_name, email: newRow.email, role: newRow.role, is_activated: newRow.is_activated}});
		refetch();
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	useEffect(() => {
		if (changeUserIsError || deleteUserIsError) {
			if (editRow) {
				setRowModesModel({ [editRow]: { mode: GridRowModes.Edit } });
			}
			toast.error('Ошибка!', {
				description: `Ошибка ${changeUserIsError ? "редактирования" : "удаления"} строки, попробуйте ещё раз`,
			});
		}
	}, [changeUserIsError, deleteUserIsError])

	useEffect(() => {
		if (changeUserIsSuccess || deleteUserIsSuccess) {
			changeUserIsSuccess && setEditRow(null);
			toast.success('Успех!', {
				description: `Успешно ${changeUserIsSuccess ? "отредактирована" : "удалена"} строка`,
			});
		}
	}, [changeUserIsSuccess, deleteUserIsSuccess])

	const updatedColumns: GridColDef[] = [
			{ field: 'id', type: "number", headerName: 'ID' },
			{ field: 'full_name', type: "string", headerName: 'Полное имя', editable: true },
			{ field: 'email', type: "string", headerName: 'Email', editable: true },
			{ field: 'role',
				type: "singleSelect",
				valueOptions: [{value: 'user', label: 'Пользователь'}, {value: 'admin', label: 'Админ'}],
				headerName: 'Роль',
				editable: true
			},
			{ field: 'is_activated', type: "boolean", headerName: 'Активирован ли аккаунт', editable: true },
			{
			field: 'actions',
			type: "actions",
			headerName: 'Действия',
			cellClassName: 'actions',
			getActions: ({id}) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
				if (isInEditMode || (rowModesModel[id] && (changeUserIsLoading || changeUserIsError))) {
					return [
						<TableActionItem
							icon={<Save />}
							label="Save"
							onClick={(handleSaveClick(id))}
							itemReason="save"
							isLoading={changeUserIsLoading}
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
						isLoading={deleteUserIsLoading}
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
		if (isError || changeUserIsError || deleteUserIsError) {
			dispatch(accessErrorAnalyzer(error || changeUserError || deleteUserError));
		}
	}, [isError, changeUserIsError, deleteUserIsError])

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
				rows={isSuccess && rows ? rows : []}
				rowCount={rowCount}
				loading={isLoading}
				paginationModel={paginationModel}
				onPaginationModelChange={setPaginationModel}
				onFilterModelChange={handleFilterChange}
				onSortModelChange={handleSortModelChange}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
			/>
		</div>
	)
};

export default UsersTable;