import "./DashboardVisitorPanel.css";
import styleConfig from "../../../../style.config";

import DashboardButton from "../../../ui/Admin/Dashboard/Button/Button";
import ExplicitText from "../../../ui/Admin/Dashboard/ExplicitText/ExplicitText";

import { IDashboardVisitorPanelProps } from "../../../../types";

const DashboardVisitorPanel = ({row, handleMissedClick, handlePassedClick}: IDashboardVisitorPanelProps) => {

	if (!row) {
		return;
	}

	return (
		<div className="admin-dashboard-visitor-panel">
			<ExplicitText
				bgColor={styleConfig.colors.success.main}
				color="#FFF"
				style={{
					textAlign: 'center'
				}}
			>
				{row.full_name}
			</ExplicitText>
			<div className="admin-dashboard-visitor-panel-time">
				Время:
				<ExplicitText>
					{row.queue_time}
				</ExplicitText>
			</div>
			<div className="admin-dashboard-visitor-panel-buttons">
				<DashboardButton onClick={handlePassedClick}>Закончить</DashboardButton>
				<DashboardButton onClick={handleMissedClick}>Не пришёл</DashboardButton>
			</div>
		</div>
	)
};

export default DashboardVisitorPanel;