import { DataGrid, DataGridProps, getGridBooleanOperators, getGridNumericOperators, getGridSingleSelectOperators, getGridStringOperators } from '@mui/x-data-grid';
import { useMemo } from 'react';

const Table = ({rows, columns, pageSizeOptions = [1, 5, 10, 20, 50, 100], ...props}: DataGridProps) => {
	const updatedColumns = useMemo(() => {
		return columns.map((col) => {
			if (col.type === 'actions') {
				return col
			}
			let newCol;
			switch (col.type) {
				case 'boolean':
					newCol = {...col, filterOperators: getGridBooleanOperators().filter(
							(operator) => operator.value === 'is')};
					break;
				case 'singleSelect':
					newCol = {...col, filterOperators: getGridSingleSelectOperators().filter(
							(operator) => operator.value === 'is')};
					break;
				case 'number':
					newCol = {...col, filterOperators: getGridNumericOperators().filter(
							(operator) => operator.value === 'contains')};
					break;
				case 'string':
					newCol = {...col, filterOperators: getGridStringOperators().filter(
							(operator) => operator.value === 'equals')};
					break;
				default:
					newCol = col;
			}
			return newCol;
		});
	}, [columns])

	return (
		<div className="admin-table">
			<DataGrid
				rows={rows}
				columns={updatedColumns}
				pageSizeOptions={pageSizeOptions}
				onProcessRowUpdateError={(error) => console.log(error)}
				editMode="row"
				sortingMode="server"
				filterMode="server"
				autoHeight
				paginationMode="server"
				sx={{ 
					width: "100%",
					'--DataGrid-overlayHeight': '300px',
					boxShadow: 0,
					'& .MuiDataGrid-cell:hover': {
						color: 'secondary.dark',
					},
				}}
				{...props}
			/>
		</div>
	)
};

export default Table;