import knex from "knex";
import dbConfig from "../config/db";
import { userData } from "../types";

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

class UserModel {
	async getAll(page = -1, limit = -1, filterField = "", filterValue = "", sortField = "", sort = "", selectFields = ['*']) {
		if (selectFields[0] === '*') {
			selectFields = ["id", "full_name", "email", "role", "is_activated"];
		}

		if (!(limit !== -1 && limit > 0)) {
			let query = knexPool('users').select(...selectFields).orderBy('id');
			const rows = await query;
			return rows;
		}
		let query = knexPool("users").select(["id", "full_name", "email", "role", "is_activated"]);
		const offset = (page - 1) * limit;
		query = query.limit(limit).offset(offset);

		if (filterField && filterValue) {
			if (['is_activated', 'id'].includes(filterField)) {
				query = query.where(filterField, filterValue);
			} else {
				query = query.where(filterField, 'ilike', `%${filterValue}%`);
			}
		}

		if (sortField && sort) {
			query = query.orderBy(sortField, sort);
		} else {
			query = query.orderBy("id");
		}

		const rows = await query
		const total = await knexPool("users").count('id as count').first();
		return {
				rows: rows,
				total: total ? total.count : 0,
				page,
				limit
		};
	};

	async create(userData: userData) {
		const query = knexPool("users")
			.insert(userData)
			.returning("*");
		const rows = await query;
		return rows;
	};

	async getByField(fieldName: string, field: string) {
		const query = knexPool
			.from("users")
			.where(fieldName, field);
		const rows = await query;
		return rows;
	};

	async update(id: string, userData: Partial<userData>) {
		const query = knexPool("users")
			.where("id", id)
			.update(userData)
			.returning("*");
		const rows = await query;
		return rows;
	};

	async delete(id: string) {
		const query = knexPool("users")
			.where("id", id)
			.del()
			.returning("*");
		const rows = await query;
		return rows;
	};
};

export default UserModel;

export type { UserModel };