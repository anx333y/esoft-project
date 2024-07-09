import { TextField, TextFieldProps } from "@mui/material";
import "./Input.css";

type IInputProps = TextFieldProps & {

};

const Input = ({sx, ...props}: IInputProps) => {
	return (
		<div className="sign-input">
			<TextField
				{...props}
				fullWidth
				variant="outlined"
				sx={{
					fontFamily: "inherit",
					"&.MuiTextField-root": {
						fontFamily: "inherit"
					},
					...sx
				}}
			/>
		</div>
	)
};

export default Input;