import { Dispatch } from "react";

export type IQueue = {
	id?: string;
	"queue_date": string;
	"queue_time": string;
	"user_id": string | null;
	"full_name"?: string;
	"status"?: 'free' | 'booked' | 'passed' | 'missed' | 'process';
};

export type IDate = {
	date: number;
	month: number;
	year: number;
	type?: 'next' | 'prev' | 'current';
};

export type ICalendarProps = {
	fullDate: IDate;
	size?: 's' | 'm' | 'l';
};

export type ICheckedDateContext = {
	checkedDate: IDate;
	setCheckedDate: React.Dispatch<React.SetStateAction<IDate>> 
};

export type IPanel = {
	month: number;
	year: number;
};

export type ICarouselProps = {
	panel: {
		panelMonthYear: IPanel,
		setPanelMonthYear: React.Dispatch<React.SetStateAction<IPanel>> 
	};
	size?: 's' | 'm' | 'l';
};

export type ICarouselItemProps = {
	children: string;
	size?: 's'| 'm' | 'l';
};

export type IChipProps = {
	classNames?: string;
	size?: 's' | 'm' | 'l';
	theme?: string;
	name?: string;
	fullDate: IDate;
	startDate?: IDate;
	setIsPopupOpen: Dispatch<boolean>;
};

export type IChipListProps = {
	size?: 's' | 'm' | 'l';
	chipsData: IPanel;
	startDate: IDate;
	setIsPopupOpen: Dispatch<boolean>;
};

export type ILineProps = {
	height?: string;
	autoWidth?: boolean;
	width?: string;
	color?: string;
};

export type IPopupProps = {
	size?: 's' | 'm' | 'l';
};

export type IDataFromUserCalendarRow = {
	start: string;
	end: string;
}

export type ITimeListProps = {
	values: IQueue[] | null;
	calendarValues: IDataFromUserCalendarRow[];
	dateString?: string;
};

export type IPopupItemProps = {
	row: IQueue;
	disabled?: boolean;
	darkColor?: string;
	lightColor?: string;
	isInUserCalendar?: boolean;
};

export type IQueueCardProps = {
	title?: string;
	time?: string;
	index?: number;
	forLoading?: boolean;
};

export type IQueueInitialState = {
	data: null | IQueue[];
	dataByDate: null | (IQueue & IUserFields)[];
};

export type IUserInitialState = {
	loading: boolean;
	data: null | IUserFields;
	error: null | string;
};

export type IUserFields = {
	"id"?: string;
	"full_name"?: string;
	"email"?: string;
	"password"?: string;
	"role"?: string;
	"is_activated"?: boolean;
}

export type IRefreshToken = {
	refreshToken: string;
}

export type IUserCalendar = {
	"user_id"?: string;
	"link"?: string;
}

export type IQueryParams = {
	page?: number;
	limit?: number;
	filterField?: string | string[];
	filterValue?: string | string[];
	sortField?: string | string[];
	sort?: string | string[];
	selectFields?: string[];
}
