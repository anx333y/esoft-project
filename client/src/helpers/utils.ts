import { IQueryParams } from "../types";

export const getToken = () => {
	const storage = localStorage.getItem("user");
	if (!storage) {
		return;
	}

	const token = JSON.parse(storage).token;

	if (!token) {
		return;
	}

	return token;
}

export const formatPeople = (number: number): string => {
	if (number % 10 === 1 && number % 100 !== 11) {
			return `${number} человек`;
	} else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
			return `${number} человека`;
	} else {
			return `${number} человек`;
	}
};

export function addQueryParams(baseUrl: string, params: IQueryParams) {
	let url = new URL("http://lol.kek/" + baseUrl);
	function appendParams(key: string, value: string | string[]) {
		if (Array.isArray(value)) {
				value.forEach(v => url.searchParams.append(key, v));
		} else {
				url.searchParams.append(key, value);
		}
}
	if (params.page && params.limit) {
		appendParams('page', String(params.page));
		appendParams('limit', String(params.limit));
	}

	if (params.sort && params.sortField) {
		appendParams('sort', params.sort);
		appendParams('sortField', params.sortField);
	}

	if (params.filterField && params.filterValue && params.filterValue != "-1") {
		appendParams('filterField', params.filterField);
		appendParams('filterValue', params.filterValue);
	}

	if (params.selectFields && Array.isArray(params.selectFields)) {
			params.selectFields.forEach(field => {
				url.searchParams.append('selectFields', field);
			});
	}
	return url.toString().replace("http://lol.kek/", "");
}