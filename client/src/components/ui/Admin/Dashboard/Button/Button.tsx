import { Button, ButtonProps, lighten } from "@mui/material";
import "./Button.css";
import styleConfig from "../../../../../style.config";

type IDashboardButtonProps = ButtonProps & {

};

const DashboardButton = ({children, ...props}: IDashboardButtonProps) => {
	return (
		<div className="dashboard-button">
			<Button
				sx={{
					bgcolor: "secondary.light",
					color: "secondary.main",
					"&:hover": {
						color: lighten(styleConfig.colors.secondary.dark, 0.2),
						bgcolor: "secondary.light",
					}
				}}
				{...props}
			>
				{children}
			</Button>
		</div>
	)
};

export default DashboardButton;