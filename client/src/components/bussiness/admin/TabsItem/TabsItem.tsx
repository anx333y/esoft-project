import "./TabsItem.css";
import { Tab } from "@mui/material";

import { ITabsItemProps } from "../../../../types";

const TabsItem = ({label, infoProps, ...props}: ITabsItemProps) => {
	return (
		<div className="admin-tabs-item">
			<Tab
				label={label}
				{...infoProps}
				sx={{
					width: "100%",
				}}
				{...props}
			/>
		</div>
	)
};

export default TabsItem;