import { Button, ButtonProps } from "@mui/material";
import "./Button.css";

type ISubmitButtonProps = ButtonProps & {

};

const SubmitButton = ({children, ...props}: ISubmitButtonProps) => {
	return (
		<div className="sign-button">
			<Button
				{...props}
				variant="contained"
				type="submit"
			>
				{children}
			</Button>
		</div>
	)
};

export default SubmitButton;