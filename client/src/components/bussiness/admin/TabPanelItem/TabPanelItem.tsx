import "./TabPanelItem.css";
import { ReactNode } from "react";

type ITabPanelItemProps = {
	children: ReactNode;
}

const TabPanelItem = ({children}: ITabPanelItemProps) => {
	return (
		<div className="admin-tabpanel-item">
			{children}
		</div>
	)
};

export default TabPanelItem;