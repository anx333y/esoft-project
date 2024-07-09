import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/bussiness/header/Header/Header";
import Sidebar from "../../components/bussiness/sidebar/Sidebar/Sidebar";

const MainLayout = () => {

	return (
		<>
			<Header />
			<div className="main-layout-content">
				<Sidebar />
				<div className="main-layout-outlet-wrapper">
					<Outlet />
				</div>
			</div>
		</>
	)
};

export default MainLayout;