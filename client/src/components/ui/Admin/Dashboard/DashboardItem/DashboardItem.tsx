import "./DashboardItem.css";
import styleConfig from "../../../../../style.config";

import { IDashboardItemProps } from "../../../../../types";



const DashboardItem = ({children}: IDashboardItemProps) => {
	return (
		<div
			className="admin-dashboard-item"
			style={{
				backgroundColor: styleConfig.colors.secondary?.dark,
				color: styleConfig.colors.secondary?.light
			}}
		>
			{children}
		</div>
	)
};

export default DashboardItem;