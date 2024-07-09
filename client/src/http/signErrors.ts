type ISignErrors = {
	[keyof: number]: string;
}

const signErrors: ISignErrors = {
	400: "Неполные данные",
	401: "Неверный email или пароль",
	404: "Пользователь не найден",
	409: "Такой пользователь уже существует",
	500: "Ошибка сервера"
};

export default signErrors;