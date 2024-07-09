import { useForm } from "react-hook-form";
import Title from "../../../ui/Title/Title";
import SubmitButton from "../../../ui/sign/Button/Button";
import "./SignForm.css";
import SignFormItem from "./SignFormItem";
import { useAppDispatch } from "../../../../store/hook";
import { useLoginUserMutation, useRegisterUserMutation } from "../../../../http/signApi";
import { useEffect } from "react";
import { setUser } from "../../../../store/userSlice";
import { IUserFields } from "../../../../types";
import signErrors from "../../../../http/signErrors";
import { NavLink, useNavigate } from "react-router-dom";

type ISignFormProps = {
	type: "in" | "up";
};

const formText = {
	"up": {
		title: "Регистрация в МСТюмГУ",
		buttonText: "Зарегистрироваться",
		bottomText: (
			<>
				Уже зарегистрированы? <NavLink to="/login">Войдите в аккаунт</NavLink>!
			</>
		),
		successMessage: "Регистрация прошла успешно!"
	},
	"in": {
		title: "Войти в МСТюмГУ",
		buttonText: "Войти",
		bottomText: (
			<>
				Ещё нет аккаунта? <NavLink to="/register">Создайте аккаунт</NavLink>!
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
		// console.log(data)
		handleSignUser(data);
	};

	const setUserStore = async (token: string) => {
		dispatch(setUser(token));
	};

	console.log(data)

	useEffect(() => {
		if (isSuccess) {
			console.log(data)
			if (data.accessToken) {
				setUserStore(data.accessToken)
			}
			navigate("/");
			// console.log('succesfully login')
		}
	}, [isSuccess])

	return (
		<form className="sign-form" onSubmit={handleSubmit(onSubmitForm)}>
			<Title
				variant="h1"
			>
				{formText[type].title}
			</Title>
			{type === "up" &&
				<SignFormItem
					name="full_name"
					control={control}
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
			<SignFormItem
				name="email"
				control={control}
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
			<SignFormItem
				name="password"
				control={control}
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
				sx={ButtonStyles}
				color="secondary"
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