import { Tabs } from "@mui/material";
import SidebarItem from "../SidebarItem/SidebarItem";
import "./Sidebar.css";
import { useRouteMatch } from "../../../../helpers/hooks";


const Sidebar = () => {
	const routeMatch = useRouteMatch(['/', '/calendar', '/admin']);
	const currentTab = routeMatch?.pattern?.path;
	console.log(currentTab)

	return (
		<div className="sidebar">
			<Tabs
				orientation="vertical"
				indicatorColor="secondary"
				TabIndicatorProps={{
					sx: {
						width: "4px",
						borderRadius: "10px",
					}
				}}
				value={currentTab}
			>
				<SidebarItem
					label="Очередь"
					to="/"
					value="/"
				/>
				<SidebarItem
					label="Запись"
					to="/calendar"
					value="/calendar"
				/>
				<SidebarItem
					label="Админ"
					to="/admin"
					value="/admin"
				/>
			</Tabs>
		</div>
	)
};

export default Sidebar;