import "./ActivateUserPage.css";
import { Logout } from "@mui/icons-material";

import { useEffect } from "react";

import Text from "../../components/ui/Text/Text";
import SubmitButton from "../../components/ui/sign/Button/Button";

import { useNavigate } from "react-router-dom";

import { useActualToken, useLogout, useReauth } from "../../helpers/hooks";
import { useAppSelector } from "../../store/hook";

const ActivateUserPage = () => {
	const userIsActivate = useAppSelector(state => state.user.is_activated);
	const user = useActualToken('user');
	const navigate = useNavigate();
	const handleLogout = useLogout();

	const handleClickLogout = () => {
		handleLogout();
	};

	const reauth = useReauth();
	
	useEffect(() => {
		reauth();
	}, [])

	useEffect(() => {
		if (userIsActivate) {
			navigate('/');
		}
	}, [userIsActivate])

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user])

	return (
		<div className="activate-user-page">
			<div className="activate-user-page-message-block">
				<Text
					font="h3"
					component="span"
					sx={{
						color: 'secondary.main',
						fontWeight: 400
					}}
				>
					Для продолжения работы с сервисом Миграционной службы ТюмГУ вам необходимо активировать аккаунт.
				</Text>
				<Text
					font="h3"
					component="span"
					sx={{
						color: 'secondary.main',
						fontWeight: 400
					}}
				>
					Проверьте свою электронную почту на наличие нового письма, возможно, оно находится в спаме.
				</Text>
				<SubmitButton
					color="secondary"
					endIcon={
						<Logout />
					}
					onClick={handleClickLogout}
				>
					Выйти из аккаунта
				</SubmitButton>
			</div>
		</div>
	)
};

export default ActivateUserPage;