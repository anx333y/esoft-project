import "./Button.css";
import styleConfig from "../../../../style.config";
import { Button, ButtonProps, CircularProgress, lighten } from "@mui/material";

type ISubmitButtonProps = ButtonProps & {
	isLoading?: boolean;
}

const SubmitButton = ({children, sx, isLoading, ...props}: ISubmitButtonProps) => {
	return (
		<div className="sign-button">
			<Button
				{...props}
				variant="contained"
				type="submit"
				sx={{
					"&:hover": {
						bgcolor: lighten(styleConfig.colors.secondary.dark, 0.1),
					},
					...sx
				}}
			>
				{children}
			</Button>
			{isLoading &&
				<CircularProgress
					sx={{
						color: styleConfig.colors.secondary?.dark,
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: '-16px',
						marginLeft: '-16px',
					}}
					size={32}
				/>}
		</div>
	)
};

export default SubmitButton;