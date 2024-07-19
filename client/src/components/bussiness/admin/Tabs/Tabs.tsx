import "./Tabs.css";
import { Tabs, TabsProps } from "@mui/material";

const AdminTabs = ({value, onChange, children, ...props}: TabsProps) => {

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