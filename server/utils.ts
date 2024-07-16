import { Request } from "express";

export const getQueryParamsArrayOrString = (req: Request, param: string, defaultValue: string | null = null) => {
	const queryParams = typeof req.query[param] === 'string' ? [String(req.query[param])] : req.query[param];
	let newParams;
		if (!queryParams || !Array.isArray(queryParams)) {
			newParams = defaultValue ? [defaultValue] : []
		} else {
			newParams = queryParams.map(prm => String(prm))
		}
	return newParams;
}

export const formatHours = (hours: number) => {
	const lastDigit = hours % 10;
	const lastTwoDigits = hours % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		return `${hours} часов`;
	}

	switch (lastDigit) {
		case 1:
			return `${hours} час`;
		case 2:
		case 3:
		case 4:
			return `${hours} часа`;
		default:
			return `${hours} часов`;
	}
};

export const getISODate = (timeStamp: number) => {
	const date = new Date(timeStamp);
	const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	return dateString;
};