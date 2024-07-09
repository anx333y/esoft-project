import "./TabsItem.css";
import { Tab, TabProps } from "@mui/material";
import { IGetInfoPropsReturn } from "../Admin/Admin";

type ITabsItemProps = TabProps & {
	label: string;
	infoProps: IGetInfoPropsReturn;
};

const TabsItem = ({label, infoProps, ...props}: ITabsItemProps) => {
	return (
		<div className="admin-tabs-item">
			<Tab
				label={label} {...infoProps}
				sx={{
					width: "100%",
				}}
				{...props}
			/>
		</div>
	)
};

export default TabsItem;