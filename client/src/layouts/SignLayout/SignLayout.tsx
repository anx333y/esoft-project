import { Outlet } from "react-router-dom";
import "./SignLayout.css";

const SignLayout = () => {
	return (
		<div className="sign-layout">
			<Outlet />
		</div>
	)
};

export default SignLayout;