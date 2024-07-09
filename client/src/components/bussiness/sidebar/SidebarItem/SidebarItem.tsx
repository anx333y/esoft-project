import { Link } from "react-router-dom";
import "./SidebarItem.css";
import { ReactNode } from "react";

type ISidebarItemProps = {
	children: ReactNode;
	path: string;
}

const SidebarItem = ({children, path}: ISidebarItemProps) => {
	return (
		<div className="sidebar-item">
			<Link to={path}>
				{children}
			</Link>
		</div>
	)
};

export default SidebarItem;