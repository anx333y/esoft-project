const dbConfig = {
	client: "pg",
	connection: {
		user: "postgres",
		password: "123",
		host: "localhost",
		port: "5432",
		database: "esoftProject",
	},
	pool: {
		min: 2,
		max: 50,
		idleTimeoutMillis: 10000,
	}
};

export default dbConfig;