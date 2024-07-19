import "./Admin.css";

import { SyntheticEvent, useState } from "react";

import Tabs from "../Tabs/Tabs";
import TabsItem from "../TabsItem/TabsItem";
import TabPanel from "../TabPanel/TabPanel";
import UsersTable from "../UsersTable/UsersTable";
import QueueTable from "../QueueTable/QueueTable";
import Dashboard from "../Dashboard/Dashboard";
import NewsTable from "../NewsTable/NewsTable";
import NewsCommentsTable from "../NewsCommentsTable/NewsCommentsTable";

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
				<TabsItem label="Таблица новостей" infoProps={getInfoProps(3)} />
				<TabsItem label="Таблица комментариев" infoProps={getInfoProps(4)} />
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
			<TabPanel value={value} index={3}>
				<NewsTable />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<NewsCommentsTable />
			</TabPanel>
		</div>
	)
};

export default Admin;