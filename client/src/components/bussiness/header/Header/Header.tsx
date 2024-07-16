import { IconButton, lighten } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import Title from "../../../ui/Title/Title";
import Logout from "@mui/icons-material/Logout";
import "./Header.css";
import { logout } from "../../../../store/userSlice";
import { useLogoutUserMutation } from "../../../../http/signApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import styleConfig from "../../../../style.config";

const Header = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userFullName = useAppSelector((state) => state.user["full_name"]);
	const [
		logoutUser,
		{
			isSuccess: logoutUserIsSuccess,
			isError: logoutUserIsError
		}
	] = useLogoutUserMutation();

	const handleClickLogout = () => {
		dispatch(logout());
		logoutUser({});
		navigate('/login');
	};

	useEffect(() => {
		if (logoutUserIsSuccess) {
			toast.success('Успех!', {
				description: 'Вы успешно вышли из аккаунта'
			})
		}
	}, [logoutUserIsSuccess]);

	useEffect(() => {
		if (logoutUserIsError) {
			toast.error('Ошибка!', {
				description: 'Ошибка выхода из аккаунта, попробуйте перезагрузить страницу и попробовать снова'
			})
		}
	}, [logoutUserIsError])

	return (
		<div className="header">
			<div className="header-logo">
				<img src="./images/logo.svg" alt="" />
			</div>
			<div className="header-main">
				<div className="header-main-left">
					<Title
						variant="h2"
						component="h1"
						sx={{
							color: styleConfig.colors.error.main
						}}
					>
						Migration
					</Title>
					<Title
						variant="h2"
						component="h1"
						sx={{
							color: styleConfig.colors.secondary.dark
						}}
					>
						UTMN
					</Title>
				</div>
				<div className="header-main-right">
					{
						userFullName &&
						<>
							<Title
								variant="h4"
								component="span"
								sx={{
									fontWeight: 400,
									color: lighten(styleConfig.colors.primary.dark, 0.2)
								}}
							>
								{userFullName || ""}
							</Title>
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