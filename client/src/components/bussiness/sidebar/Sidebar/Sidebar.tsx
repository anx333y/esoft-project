import Title from "../../../ui/Title/Title";
import SidebarItem from "../SidebarItem/SidebarItem";
import "./Sidebar.css";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<SidebarItem path="/">
				<Title variant="h3">
					Очередь
				</Title>
			</SidebarItem>
			<SidebarItem path="/calendar">
				<Title variant="h3">
					Запись
				</Title>
			</SidebarItem>
			<SidebarItem path="/admin">
				<Title variant="h3">
					Админ-панель
				</Title>
			</SidebarItem>
		</div>
	)
};

export default Sidebar;