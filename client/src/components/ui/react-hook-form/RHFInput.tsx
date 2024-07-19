import { FormHelperText, SxProps } from "@mui/material";

import { ReactElement, cloneElement } from "react";

import { Controller, FieldErrors, UseControllerProps } from "react-hook-form";

type IRHFInputProps = UseControllerProps & {
	errors?: FieldErrors;
	styles?: SxProps;
	placeholder?: string;
	type?: string;
	isRequired?: boolean;
	renderComponent: ReactElement;
};

const RHFInput = ({
	control,
	errors,
	styles,
	name,
	placeholder,
	type = "text",
	rules,
	isRequired = true,
	renderComponent
}: IRHFInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required: isRequired ? "* Это обязательное поле": false,
				...rules,
			}}
			render={({field}) => (
				<>
					{cloneElement(renderComponent, {
						placeholder,
						type,
						inputProps: {sx: styles, ...field},
						error: errors && !!errors[name]?.message
					})}
					<FormHelperText
						error={errors && !!errors[name]?.message}
					>
						{errors && `${errors[name]?.message || ""}`}
					</FormHelperText>
				</>
			)
			}
			/>
	)
};

export default RHFInput;