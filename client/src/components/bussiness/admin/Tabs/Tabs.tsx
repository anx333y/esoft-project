import "./Tabs.css";
import { Tabs, TabsProps } from "@mui/material";

type IAdminTabsProps = TabsProps & {
};

const AdminTabs = ({value, onChange, children, ...props}: IAdminTabsProps) => {

	return (
		<div className="admin-tabs">
			<Tabs
				value={value}
				onChange={onChange}
				variant="fullWidth"
				indicatorColor="secondary"
				textColor="secondary"
				{...props}
			>
				{children}
			</Tabs>
		</div>
	)
};

export default AdminTabs;