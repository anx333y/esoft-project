import { ReactNode } from "react";
import styleConfig from "../../../../style.config";
import "./DashboardItem.css";

type IDashboardItemProps = {
	children: ReactNode;
}

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