import "./TabPanelItem.css";

import { ITabPanelItemProps } from "../../../../types";

const TabPanelItem = ({children}: ITabPanelItemProps) => {
	return (
		<div className="admin-tabpanel-item">
			{children}
		</div>
	)
};

export default TabPanelItem;