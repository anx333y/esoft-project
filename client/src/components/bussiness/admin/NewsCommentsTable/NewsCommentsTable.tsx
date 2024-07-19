import { Delete } from "@mui/icons-material";
import { GridColDef, GridRowId, useGridApiRef } from "@mui/x-data-grid";

import { useEffect, useMemo, useRef, useState } from "react";

import Table from "../../../ui/Admin/Table/Table";
import TableActionItem from "../../../ui/Admin/TableActionItem/TableActionItem";

import { toast } from "sonner";

import { handleFilterChange, handleSortModelChange } from "../../../../helpers/utils";

import { useDeleteNewsCommentMutation, useGetNewsCommentsQuery, useGetUsersQuery } from "../../../../http/mainApi";


const NewsCommentsTable = () => {
	const apiRef = useGridApiRef();
	const [rows, setRows] = useState<any>(null);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const [filterOptions, setFilterOptions] = useState({});
	const [sortOptions, setSortOptions] = useState({});

	const { data, isSuccess, isLoading, isError } = useGetNewsCommentsQuery({
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
		deleteNewsComment,
		{
			isSuccess: deleteNewsCommentIsSuccess,
			isLoading: deleteNewsCommentIsLoading,
			isError: deleteNewsCommentIsError
		}
	] = useDeleteNewsCommentMutation();

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


	const handleDeleteClick = (id: GridRowId) => () => {
		deleteNewsComment(String(id));
		if (rows) {
			setRows(rows.filter((row: any) => row.id !== id));
		}
	};

	useEffect(() => {
		if (deleteNewsCommentIsError) {
			toast.error('Ошибка!', {
				description: `Ошибка удаления строки, попробуйте ещё раз`,
			});
		}
	}, [deleteNewsCommentIsError]);

	useEffect(() => {
		if (isError || usersIsError) {
			toast.error('Ошибка!', {
				description: `Ошибка получения данных, попробуйте обновить страницу`,
			});
		}
	}, [isError, usersIsError]);

	useEffect(() => {
		if (deleteNewsCommentIsSuccess) {
			toast.success('Успех!', {
				description: `Успешно удалена строка`,
			});
		}
	}, [deleteNewsCommentIsSuccess])

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
						icon={<Delete />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						itemReason="delete"
						isLoading={deleteNewsCommentIsLoading}
					/>,
				])
		}];

	const rowCountRef = useRef(isSuccess ? data?.total : 0);

	const rowCount = useMemo(() => {
		if (!!data?.total) {
			rowCountRef.current = parseInt(data.total);
		}
		return rowCountRef.current;
	}, [data?.total]);

	return (
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
			/>
		</div>
	)
};

export default NewsCommentsTable;