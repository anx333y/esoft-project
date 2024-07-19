import { GridColDef, GridRowId, GridSlots, useGridApiRef } from "@mui/x-data-grid";
import Table from "../../../ui/Admin/Table/Table";
import { useDeleteNewsRowMutation, useGetAllNewsQuery, useGetUsersQuery } from "../../../../http/mainApi";
import { useEffect, useMemo, useRef, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import TableActionItem from "../../../ui/Admin/TableActionItem/TableActionItem";
import { toast } from "sonner";
import UpdateNewsRowDialog from "../UpdateNewsRowDialog/UpdateNewsRowDialog";
import { INews } from "../../../../types";
import EditToolbar from "./EditToolbar";
import { handleFilterChange, handleSortModelChange } from "../../../../helpers/utils";

export type INewsDialogState = {
	open: boolean;
	row: INews | null;
	type: 'update' | 'add' | 'none';
};

const NewsTable = () => {
	const apiRef = useGridApiRef();
	const [rows, setRows] = useState<any>(null);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const [filterOptions, setFilterOptions] = useState({});
	const [sortOptions, setSortOptions] = useState({});
	const [dialog, setDialog] = useState<INewsDialogState>({
		open: false,
		row: null,
		type: 'none'
	});

	const clearDialog = () => {
		setDialog({
			open: false,
			row: null,
			type: 'none'
		})
	};

	const { data, isSuccess, isLoading, isError, refetch } = useGetAllNewsQuery({
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
		deleteNewsRow,
		{
			isSuccess: deleteNewsRowIsSuccess,
			isLoading: deleteNewsRowIsLoading,
			isError: deleteNewsRowIsError
		}
	] = useDeleteNewsRowMutation();

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
		if (!rows) {
			return;
		}
		const editRow = rows.find((row: INews) => row.id === id);
		if (!editRow) {
			return;
		}
		setDialog({
			open: true,
			row: editRow,
			type: 'update'
		});
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		deleteNewsRow(String(id));
		if (rows) {
			setRows(rows.filter((row: any) => row.id !== id));
		}
		refetch();
	};

	useEffect(() => {
		if (deleteNewsRowIsError) {
			toast.error('Ошибка!', {
				description: `Ошибка удаления строки, попробуйте ещё раз`,
			});
		}
	}, [deleteNewsRowIsError]);

	useEffect(() => {
		if (isError || usersIsError) {
			toast.error('Ошибка!', {
				description: `Ошибка получения данных, попробуйте обновить страницу`,
			});
		}
	}, [isError, usersIsError]);

	useEffect(() => {
		if (deleteNewsRowIsSuccess) {
			toast.success('Успех!', {
				description: `Успешно удалена строка`,
			});
		}
	}, [deleteNewsRowIsSuccess])

	const updatedColumns: GridColDef[] = [
			{ field: 'id', type: "number", headerName: 'ID' },
			{ field: 'title', type: "string", headerName: 'Заголовок' },
			{ field: 'content', type: "string", headerName: 'Содержимое', maxWidth: 200 },
			{ field: 'author_id',
				type: "singleSelect",
				valueOptions:
					usersData
					? [{"value": -1, "label": 'Нет'}, ...usersData.map((row: {id: string, full_name: string}) => (
							{"value": row.id, "label": row.full_name}
						))]
					: [{"value": -1, "label": 'Нет'}],
				headerName: 'Пользователь'
			},
			{
			field: 'actions',
			type: "actions",
			headerName: 'Действия',
			cellClassName: 'actions',
			getActions: ({id}) => (
				[
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
						isLoading={deleteNewsRowIsLoading}
					/>,
				]
			)
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
		<div className="admin-news-table">
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
				slots={{
					toolbar: EditToolbar as GridSlots['toolbar'],
				}}
				slotProps={{
					toolbar: { setDialog },
				}}
			/>
		</div>
		<UpdateNewsRowDialog dialogState={dialog} clearDialogState={clearDialog} />
		</>
	)
};

export default NewsTable;