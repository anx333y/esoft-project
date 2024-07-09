import knex from "knex";
import dbConfig from "../config/db";
import { newsData } from "../types";

const knexPool = knex({
	client: dbConfig.client,
	connection: {
		...dbConfig.connection
	},
	pool: {
		min: dbConfig.pool.min,
		max: dbConfig.pool.max,
		idleTimeoutMillis: dbConfig.pool.idleTimeoutMillis
	}
});

class NewsModel {
	async getAll() {
		const query = knexPool("news")
			.join("users", "news.news_author_id", "=", "users.id")
			.select("news.id", "users.full_name", "news_title", "content", "created_at");
		const rows = await query;
		return rows;
	};

	async create(newsData: newsData) {
		const query = knexPool("news")
			.insert(newsData);
		const rows = await query;
	};

	async getById(id: string) {
		const query = knexPool
			.from("news")
			.where("id", id);
		const rows = await query;
		return rows;
	};

	async update(id: string, newsData: newsData) {
		const query = knexPool("news")
			.where("id", id)
			.update(newsData);
		const rows = await query;
		return rows;
	};

	async delete(id: string) {
		const query = knexPool("news")
			.where("id", id)
			.del();
		const rows = await query;
		return rows;
	};
};

export default NewsModel;