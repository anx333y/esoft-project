import "./SignPage.css";

import { useEffect } from "react";

import SignForm from "../../components/bussiness/sign/SignForm/SignForm";

import { useNavigate } from "react-router-dom";

import { ISignFormProps } from "../../types";
import { useActualToken } from "../../helpers/hooks";

const SignPage = ({type = "up"}: ISignFormProps) => {
	const user = useActualToken('user');
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user])

	return (
		<div className="sign-page">
			<SignForm type={type} />
		</div>
	)
};

export default SignPage;