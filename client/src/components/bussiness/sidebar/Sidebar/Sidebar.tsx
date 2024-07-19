import "./Sidebar.css";
import { Tabs } from "@mui/material";

import SidebarItem from "../SidebarItem/SidebarItem";

import { useRouteMatch } from "../../../../helpers/hooks";
import { useAppSelector } from "../../../../store/hook";


const Sidebar = () => {
	const userRole = useAppSelector(state => state.user.role);
	const routeMatch = useRouteMatch(['/', '/calendar', '/admin', '/news']);
	const currentTab = routeMatch?.pattern?.path;

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
					label="Новости"
					to="/news"
					value="/news"
				/>
				{
					userRole === 'admin' &&
						<SidebarItem
							label="Админ"
							to="/admin"
							value="/admin"
					/>
				}
			</Tabs>
		</div>
	)
};

export default Sidebar;