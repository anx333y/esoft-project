import knex from "knex";
import dbConfig from "../config/db";
import { queueData } from "../types";

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

class QueueModel {
	formateRows = (rows: queueData[]) => {
		const formattedRows = rows.map(row => {
			const tempDate = new Date(Date.parse(row.queue_date));
			tempDate.setDate(tempDate.getDate() + 1);
			return {
			...row,
			queue_date: tempDate.toISOString().split("T")[0]
		}});
	
		return formattedRows;
	};

	async getAll(page = -1, limit = -1, filterField = "", filterValue = "", sortField = "", sort = "") {
		let query = knexPool("queue")
				.leftJoin("users", "users.id", "=", "queue.user_id")
				.select(
						"queue.id",
						"queue_date",
						"queue_time",
						knexPool.raw("COALESCE(queue.user_id, -1) as user_id"),
						knexPool.raw("COALESCE(users.full_name, '') as full_name"),
						"status"
				);

		if (!(limit !== -1 && limit > 0)) {
			const rows = await query.orderBy(["queue_date", "queue_time"]);
			return this.formateRows(rows);
		}

		const offset = (page - 1) * limit;
		query = query.limit(limit).offset(offset);

		if (filterField && filterValue) {
			if (['status', 'queue_date', 'queue_time'].includes(filterField)) {
				query = query.where(filterField, filterValue);
			} else {
				query = query.where(filterField, 'ilike', `%${filterValue}%`);
			}
		}

		if (sortField && sort) {
			query = query.orderBy(sortField, sort);
		} else {
			query = query.orderBy(["queue_date", "queue_time"])
		}

		const rows = await query
		const total = await knexPool("queue").count('queue_date as count').first();
		return {
				rows: this.formateRows(rows),
				total: total ? total.count : 0,
				page,
				limit
		};
	}


	async create(queueData: queueData) {
		const query = knexPool("queue")
			.insert(queueData)
			.returning('*');
		const rows = await query;
		return this.formateRows(rows);
	};

	async getById(id: string) {
		const query = knexPool
			.from("queue")
			.where("id", id);
		const rows = await query;
		const formattedRows = rows.map(row => {
			const tempDate = new Date(Date.parse(row.queue_date));
			tempDate.setDate(tempDate.getDate() + 1);
			return {
			...row,
			queue_date: tempDate.toISOString().split("T")[0]
		}});
		return formattedRows;
	};

	async update(id: string, queueData: queueData) {
		const query = knexPool("queue")
			.where("id", id)
			.update(queueData)
			.returning('*');
		const rows = await query;
		const formattedRows = rows.map(row => {
			const tempDate = new Date(row.queue_date);
			tempDate.setDate(tempDate.getDate() + 1);
			return {
			...row,
			queue_date: tempDate.toISOString().split("T")[0]
		}});
		return formattedRows;
	};

	async delete(id: string) {
		const query = knexPool("queue")
			.where("id", id)
			.del()
			.returning('*');
		const rows = await query;
		const formattedRows = rows.map(row => {
			const tempDate = new Date(Date.parse(row.queue_date));
			tempDate.setDate(tempDate.getDate() + 1);
			return {
			...row,
			queue_date: tempDate.toISOString().split("T")[0]
		}});
		return formattedRows;
	};

	async getByDate(queueDate: string) {
		// console.log(queueDate)
		const query = knexPool
			.from("queue")
			.where("queue_date", queueDate)
			.leftJoin("users", "queue.user_id", "users.id")
			.orderBy(["queue_date", "queue_time"]);
		const rows = await query;
		const formattedRows = rows.map(row => {
			const tempDate = new Date(Date.parse(row.queue_date));
			tempDate.setDate(tempDate.getDate() + 1);
			return {
			...row,
			queue_date: tempDate.toISOString().split("T")[0]
		}});
		return formattedRows;
	};
};

export default QueueModel;

export type { QueueModel };

async function addRecords() {
  const today = new Date("2024-07-17");
	let nextWeekDateTime = [];
	const daysToMonday = Math.abs((7 - today.getDay()) % 7 + 1);
	const nextDate = new Date(today);
	nextDate.setDate(today.getDate() + daysToMonday);
	for (let i = 0; i < 5; i++) {
		const addedDate = nextDate.toISOString().split('T')[0];
		const tempTime = new Date();
		tempTime.setHours(13);
		tempTime.setMinutes(30);
		tempTime.setSeconds(0);
		while (tempTime.toTimeString().split(' ')[0] <= "17:00:00") {
			nextWeekDateTime.push({
				"queue_date": nextDate.toISOString().split('T')[0],
				"queue_time": tempTime.toTimeString().split(' ')[0]
			});
			tempTime.setMinutes(tempTime.getMinutes() + 3);
		}
		nextDate.setDate(nextDate.getDate() + 1);
	}
	// console.log(nextWeekDateTime);

  if (nextWeekDateTime.length > 0) {
    await knexPool('queue').insert(nextWeekDateTime).returning('*');
  }
}

// addRecords();