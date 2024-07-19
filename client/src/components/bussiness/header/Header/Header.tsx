import "./Header.css";
import styleConfig from "../../../../style.config";
import { IconButton, lighten } from "@mui/material";
import Logout from "@mui/icons-material/Logout";

import Text from "../../../ui/Text/Text";

import { useAppSelector } from "../../../../store/hook";
import { useLogout } from "../../../../helpers/hooks";

const Header = () => {
	const userFullName = useAppSelector((state) => state.user["full_name"]);
	const handleLogout = useLogout();

	const handleClickLogout = () => {
		handleLogout()
	};

	return (
		<div className="header">
			<div className="header-logo">
				<img src="./images/logo.svg" alt="" />
			</div>
			<div className="header-main">
				<div className="header-main-left">
					<Text
						font="h2"
						component="h1"
						sx={{
							color: styleConfig.colors.error.main
						}}
					>
						Migration
					</Text>
					<Text
						font="h2"
						component="h1"
						sx={{
							color: styleConfig.colors.secondary.dark
						}}
					>
						UTMN
					</Text>
				</div>
				<div className="header-main-right">
					{
						userFullName &&
						<>
							<Text
								font="h4"
								component="span"
								sx={{
									fontWeight: 400,
									color: lighten(styleConfig.colors.primary.dark, 0.2)
								}}
							>
								{userFullName || ""}
							</Text>
							<IconButton
								onClick={handleClickLogout}
							>
								<Logout color="secondary"/>
							</IconButton>
						</>
					}
				</div>
			</div>
		</div>
	)
};

export default Header;