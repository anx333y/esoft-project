import TabPanelItem from "../TabPanelItem/TabPanelItem";

import { TabPanelProps } from "../../../../types";

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`admin-tabpanel-${index}`}
			aria-labelledby={`admin-tab-${index}`}
			className="admin-tabpanel"
			{...other}
		>
			{
				value === index &&
					<TabPanelItem>
						{children}
					</TabPanelItem>
			}
		</div>
	);
}

export default TabPanel;