import "./Button.css";
import styleConfig from "../../../../../style.config";
import { Button, ButtonProps, lighten } from "@mui/material";

const DashboardButton = ({children, ...props}: ButtonProps) => {
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