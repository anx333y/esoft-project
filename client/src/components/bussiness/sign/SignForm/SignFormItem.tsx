import { Controller, FieldErrors, UseControllerProps } from "react-hook-form";
import Input from "../../../ui/sign/Input/Input";
import { SxProps } from "@mui/material";

type ISignFormItemProps = UseControllerProps & {
	errors?: FieldErrors;
	styles?: SxProps;
	placeholder?: string;
	type?: string;
	isRequired?: boolean;
};

const SignFormItem = ({control, errors, styles, name, placeholder, type = "text", rules, isRequired = true}: ISignFormItemProps) => {
	return (
		<Controller
				name={name}
				control={control}
				rules={{
					...rules,
					required: isRequired ? "* Это обязательное поле": false
				}}
				defaultValue=""
				render={({field}) =>
				<Input
					placeholder={placeholder}
					type={type}
					inputProps={{sx:styles, ...field}}
					helperText={errors && `${errors[name]?.message || ""}`}
					error={errors && !!errors[name]?.message}
				/>}
			/>
	)
};

export default SignFormItem;