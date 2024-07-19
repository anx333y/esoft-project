import { GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, useGridApiRef } from "@mui/x-data-grid";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";

import { useEffect, useMemo, useRef, useState } from "react";

import Table from "../../../ui/Admin/Table/Table";
import TableActionItem from "../../../ui/Admin/TableActionItem/TableActionItem";

import { toast } from "sonner";

import { handleFilterChange, handleRowEditStop, handleRowModesModelChange, handleSortModelChange } from "../../../../helpers/utils";

import { useChangeUserMutation, useDeleteUserMutation, useGetUsersQuery } from "../../../../http/mainApi";

const UsersTable = () => {
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

	const { data, isSuccess, isLoading, isError, refetch } = useGetUsersQuery({
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
			isError: changeUserIsError
		}
	] = useChangeUserMutation();

	const [
		deleteUser,
		{
			isSuccess: deleteUserIsSuccess,
			isLoading: deleteUserIsLoading,
			isError: deleteUserIsError
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
		changeUser({
			id: newRow.id,
			content: {
				full_name: newRow.full_name,
				email: newRow.email,
				role: newRow.role,
				is_activated: newRow.is_activated
			}});
		refetch();
		return updatedRow;
	};

	useEffect(() => {
		if (changeUserIsError || deleteUserIsError) {
			if (editRow) {
				setRowModesModel({ [editRow]: { mode: GridRowModes.Edit } });
			}
			toast.error('Ошибка!', {
				description: `Ошибка ${
					changeUserIsError
						? "редактирования"
						: "удаления"
					} строки, попробуйте ещё раз`,
			});
		}
	}, [changeUserIsError, deleteUserIsError]);

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка!', {
				description: `Ошибка получения данных, попробуйте обновить страницу`,
			});
		}
	}, [isError]);

	useEffect(() => {
		if (changeUserIsSuccess || deleteUserIsSuccess) {
			changeUserIsSuccess && setEditRow(null);
			toast.success('Успех!', {
				description: `Успешно ${
					changeUserIsSuccess
						? "отредактирована"
						: "удалена"
					} строка`,
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
				onFilterModelChange={handleFilterChange(setFilterOptions)}
				onSortModelChange={handleSortModelChange(setSortOptions)}
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange(setRowModesModel)}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
			/>
		</div>
	)
};

export default UsersTable;