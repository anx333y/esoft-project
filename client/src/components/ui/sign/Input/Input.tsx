import { TextField, TextFieldProps } from "@mui/material";
import "./Input.css";
import styleConfig from "../../../../style.config";

type IInputProps = TextFieldProps & {

};

const Input = ({sx, inputProps, ...props}: IInputProps) => {
	const thisInputPropsSx = inputProps && inputProps.sx ? inputProps.sx : {} ; 
	return (
		<div className="sign-input">
			<TextField
				{...props}
				fullWidth
				variant="outlined"
				color="secondary"
				sx={{
					fontFamily: "inherit",
					"&.MuiTextField-root": {
						fontFamily: "inherit"
					},
					"&:hover": {
						borderColor: styleConfig.colors.secondary.light
					},
					...sx
				}}
				inputProps={{
					...inputProps,
					sx: {
						padding: "16px 20px",
						'& .MuiInputBase-root': {
							'& input': {
								'&:-webkit-autofill': {
									'-webkit-box-shadow': '0 0 0 100px transparent inset',
									'-webkit-text-fill-color': 'inherit',
								},
								'&:-webkit-autofill:focus': {
									'-webkit-box-shadow': '0 0 0 100px transparent inset',
									'-webkit-text-fill-color': 'inherit',
								},
							},
						},
						...thisInputPropsSx
					},
				}}
			/>
		</div>
	)
};

export default Input;