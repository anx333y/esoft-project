import "./SignForm.css";
import styleConfig from "../../../../style.config";

import { useEffect } from "react";

import Text from "../../../ui/Text/Text";
import SubmitButton from "../../../ui/sign/Button/Button";
import RHFInput from "../../../ui/react-hook-form/RHFInput";
import { setUser } from "../../../../store/userSlice";
import signErrors from "../../../../http/signErrors";
import Input from "../../../ui/sign/Input/Input";

import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLoginUserMutation, useRegisterUserMutation } from "../../../../http/signApi";

import { ISignFormProps, IUserFields } from "../../../../types";
import { useAppDispatch } from "../../../../store/hook";

const formText = {
	"up": {
		Text: "Регистрация в МСТюмГУ",
		buttonText: "Зарегистрироваться",
		bottomText: (
			<>
				Уже зарегистрированы? <NavLink to="/login">Войдите в аккаунт</NavLink>!
			</>
		),
		successMessage: "Регистрация прошла успешно!"
	},
	"in": {
		Text: "Войти в МСТюмГУ",
		buttonText: "Войти",
		bottomText: (
			<>
				Ещё нет аккаунта? <NavLink to="/register">Создайте его</NavLink>!
			</>
		),
		successMessage: "Вход прошёл успешно!"
	}
};

const InputStyles = {
	width: "380px",
	height: "68px",
	boxSizing: "border-box"
};

const ButtonStyles = {
	width: "380px",
	height: "64px"
};


const SignForm = ({type = "up"}: ISignFormProps) => {
	const {
		formState: {
			errors
		},
		handleSubmit,
		control
	} = useForm();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [
		sign,
		{
			data,
			isSuccess,
			isError,
			isLoading,
			error
		}
	] = type === "up" ? useRegisterUserMutation() : useLoginUserMutation();

	const handleSignUser = async (data: IUserFields) => {
		const { email = null, full_name = null, password = null } = data;
		if (email && full_name && password && type === "up") {
			await sign({email, full_name, password})
		} else if (email && password && type == "in"){
			await sign({email, password})
		}
	}

	const onSubmitForm = async (data: IUserFields) => {
		handleSignUser(data);
	};

	const setUserStore = async (token: string) => {
		dispatch(setUser(token));
	};

	useEffect(() => {
		if (isSuccess) {
			if (data.accessToken) {
				setUserStore(data.accessToken)
			}
			navigate("/");
		}
	}, [isSuccess])

	return (
		<form className="sign-form" onSubmit={handleSubmit(onSubmitForm)}>
			<Text
				variant="h1"
				sx={{
					color: styleConfig.colors.secondary.dark,
					marginBottom: "16px"
				}}
			>
				{formText[type].Text}
			</Text>
			{type === "up" &&
				<RHFInput
					name="full_name"
					control={control}
					renderComponent={<Input defaultValue="" />}
					rules={{
						required: "* Это обязательное поле",
						minLength: {
							value: 5,
							message: "* Длина должна быть не менее 5 символов"
						},
						pattern: {
							value: /^([А-ЯЁA-Z][а-яёa-z-]*\s?)+$/,
							message: "* Каждое слово должно начинаться с заглавной буквы"
						}
					}}
					placeholder="Полное имя"
					styles={InputStyles}
					errors={errors}
				/>
			}
			<RHFInput
				name="email"
				control={control}
				renderComponent={<Input defaultValue="" />}
				rules={{
					pattern: {
						value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
						message: "Неверный формат"
					}
				}}
				placeholder="E-mail"
				errors={errors}
				styles={InputStyles}
			/>
			<RHFInput
				name="password"
				control={control}
				renderComponent={<Input defaultValue="" />}
				rules={{
					minLength: {
						value: 8,
						message: "* Пароль должен быть не менее 8 симловов"
					},
					pattern: {
						value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
						message: "* Пароль должен содержать заглавную букву, цифру, специальный символ"
					}
				}}
				placeholder="Пароль"
				type="password"
				styles={InputStyles}
				errors={errors}
			/>
			<SubmitButton
				sx={{
					...ButtonStyles
				}}
				color="secondary"
				isLoading={isLoading}
			>
				{formText[type].buttonText}
			</SubmitButton>
			<span className="sign-bottom-text">
				{formText[type].bottomText}
			</span>
			{
				isError &&
				<span className="sign-message sign-error">
					{'status' in error && signErrors[error.status as number]}
				</span>
			}
			{
				isSuccess &&
				<span className="sign-message">
					{formText[type].successMessage}
				</span>
			}
		</form>
	)
};

export default SignForm;