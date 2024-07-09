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