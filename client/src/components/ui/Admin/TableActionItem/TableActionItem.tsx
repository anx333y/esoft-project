import "./TableActionItem.css";
import styleConfig from "../../../../style.config";
import { CircularProgress } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { ITableActionItemProps } from "../../../../types";



const TableActionItem = ({itemReason = '', isLoading = false, ...props}: ITableActionItemProps) => {

	return (
		<div className="admin-table-action-item">
			<GridActionsCellItem
					{...props}
					sx={{
						color: itemReason !== 'save' ? 'primary.main' : 'success.main',
						width: 36,
						height: 36
					}}
				/>
				{
					isLoading && ["save", "delete"].includes(itemReason) &&
					<CircularProgress
						size={36}
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							color: styleConfig.colors.secondary?.dark
						}}
					/>
				}
		</div>
	)
};

export default TableActionItem;