import "./Input.css";
import styleConfig from "../../../../style.config";
import { TextField, TextFieldProps } from "@mui/material";

const Input = ({sx, inputProps, ...props}: TextFieldProps) => {
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
						...thisInputPropsSx
					},
				}}
			/>
		</div>
	)
};

export default Input;