import { SkeletonProps } from "@mui/material";
import MuiSkeleton from "@mui/material/Skeleton";

const Skeleton = ({sx, ...props}: SkeletonProps) => {
	return (
		<MuiSkeleton
			{...props}
			sx={{
				bgcolor: "#fff",
				...sx
			}}
		/>
	)
};

export default Skeleton;