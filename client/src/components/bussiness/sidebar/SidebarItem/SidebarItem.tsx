import { Link } from "react-router-dom";
import "./SidebarItem.css";
import { Tab, TabProps } from "@mui/material";

type ISidebarItemProps = TabProps & {
	to: string;
}

const SidebarItem = ({label, to, sx, value, ...props}: ISidebarItemProps) => {
	return (
		<Tab
			label={label}
			sx={{
				width: "100%",
				alignItems: "flex-end",
				fontSize: "16px",
				minHeight: "64px",
				paddingRight: "32px",
				color: 'secondary.main',
				'&.Mui-selected': {
					bgcolor: 'secondary.light',
					color: 'secondary.main'
				},
				...sx
			}}
			to={to}
			component={Link}
			value={value}
			{...props}
		/>
	)
};

export default SidebarItem;