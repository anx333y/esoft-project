import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import Title from "../../../ui/Title/Title";
import Logout from "@mui/icons-material/Logout";
import "./Header.css";
import { logout } from "../../../../store/userSlice";
import { useLogoutUserMutation } from "../../../../http/signApi";

const Header = () => {
	const dispatch = useAppDispatch();
	const userFullName = useAppSelector((state) => state.user["full_name"]);
	const [logoutUser, {error}] = useLogoutUserMutation();

	const handleClickLogout = () => {
		dispatch(logout());
		logoutUser({});
	};

	console.log(error)

	return (
		<div className="header">
			<div className="header-logo">
				<img src="./images/logo.svg" alt="" />
			</div>
			<div className="header-main">
				<div className="header-main-left">
					<Title variant="h1">
						Очередь
					</Title>
				</div>
				<div className="header-main-right">
					{
						userFullName &&
						<>
							{userFullName || ""}
							<IconButton
								onClick={handleClickLogout}
							>
								<Logout />
							</IconButton>
						</>
					}
				</div>
			</div>
		</div>
	)
};

export default Header;