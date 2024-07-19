import { ButtonProps, DialogProps, TabProps } from "@mui/material";
import { Dispatch, HTMLAttributes, ReactNode } from "react";
import { INewsDialogState } from "./components/bussiness/admin/NewsTable/NewsTable";
import { ICommentsDialogState, IQuickSearchParams } from "./components/bussiness/news/NewsList/NewsList";
import { GridActionsCellItemProps } from "@mui/x-data-grid";

export type IQueue = {
	id?: string;
	"queue_date": string;
	"queue_time": string;
	"user_id"?: string | null;
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
	quickSearchValue?: string;
}

export type INews = {
	id?: string;
	author_id?: string;
	title?: string;
	content?: string;
	created_at?: string;
	updated_at?: string;
	news_comments_count?: string;
}

export type INewsComment = {
	id?: string;
	news_id?: string;
	author_id?: string;
	content?: string;
	created_at?: string;
	full_name?: string;
}

export type IGetInfoPropsReturn = {
	id: string;
	"aria-controls": string;
}

export type IDashboardVisitorPanelProps = {
	row: IQueue;
	handleMissedClick: () => void;
	handlePassedClick: () => void;
}

export type IDashboardNextProps = {
	bookedQueue: IQueue[] | [];
	handleClickNext: () => void;
}

export type TabPanelProps = {
	children?: React.ReactNode;
	index: number;
	value: number;
};

export type ITabPanelItemProps = {
	children: ReactNode;
}

export type ITabsItemProps = TabProps & {
	label: string;
	infoProps: IGetInfoPropsReturn;
};

export type IUpdateNewsRowDialogProps = {
	dialogState: INewsDialogState,
	clearDialogState: () => void
};

export type IAddArrayQueueDialogProps = DialogProps & {
	setOpen: Dispatch<boolean>;
};

export type ITimeGroupItemProps = {
	groupKey: string;
	onClickProp: any;
	state: string | null;
}

export type ITimeGroupListProps = {
	values: string[];
	onClickProp: any;
	state: string | null;
}

export type IUserCalendarDialogProps = DialogProps & {
	setOpen: Dispatch<boolean>;
	link: string | null;
	userId: string;
};

export type ICommentProps = {
	userName: string;
	content: string;
	createdAt: string;
}

export type CommentFormValues = {
	comment?: string;
}

export type ICommentsAddFormProps = {
	newsId: string;
}

export type ICommentsDialogProps = {
	state: ICommentsDialogState,
	clearState: () => void
}

export type ICommentsListProps = {
	newsId: string;
}

export type INewsCardProps = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	commentsCount: string;
	openDialog: () => void;
}

export type INewsQuickSearchFormProps = {
	setQuickSearchParams: Dispatch<IQuickSearchParams | null>;
}

export type IOneNewsProps = {
	id: string;
}

export type IQueueListProps = {
	list?: IQueue[] | null;
}

export type ISidebarItemProps = TabProps & {
	to: string;
}

export type ISignFormProps = {
	type: "in" | "up";
};

export type IDashboardItemProps = {
	children: ReactNode;
}

export type IExplicitText = {
	children: ReactNode;
	bgColor?: string;
	color?: string;
	style?: HTMLAttributes<HTMLSpanElement>['style'];
}

export type ITableActionItemProps = GridActionsCellItemProps & {
	itemReason?: string;
	isLoading?: boolean;
}

export type ICalendarButtonProps = ButtonProps & {
	children?: ReactNode;
	onClickProp?: () => void;
	isLoading?: boolean;
}