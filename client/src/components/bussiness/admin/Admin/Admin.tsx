import "./Admin.css";
import Tabs from "../Tabs/Tabs";
import { SyntheticEvent, useState } from "react";
import TabsItem from "../TabsItem/TabsItem";
import TabPanel from "../TabPanel/TabPanel";
import UsersTable from "../UsersTable/UsersTable";
import QueueTable from "../QueueTable/QueueTable";
import Dashboard from "../Dashboard/Dashboard";

export type IGetInfoPropsReturn = {
	id: string;
	"aria-controls": string;
}

const getInfoProps = (index: number) => {
	return {
		id: `admin-tab-${index}`,
		'aria-controls': `admin-tabpanel-${index}`,
	};
}

const Admin = () => {
	const [value, setValue] = useState(0);

	const handleChange = (_: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	}

	return (
		<div className="admin">
			<Tabs value={value} onChange={handleChange}>
				<TabsItem label="Обзор" infoProps={getInfoProps(0)}/>
				<TabsItem label="Таблица пользователей" infoProps={getInfoProps(1)} />
				<TabsItem label="Таблица очереди" infoProps={getInfoProps(2)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Dashboard />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<UsersTable />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<QueueTable />
			</TabPanel>
		</div>
	)
};

export default Admin;