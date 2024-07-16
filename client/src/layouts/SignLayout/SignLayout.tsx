import { Outlet } from "react-router-dom";
import "./SignLayout.css";

const SignLayout = () => {
	return (
		<div className="sign-layout">
			<div className="sign-layout-background">
			</div>
			<Outlet />
		</div>
	)
};

export default SignLayout;