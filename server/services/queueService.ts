import QueueModel from "../models/queueModel";
import { queueData } from "../types";
import { getAllQueryParams } from "../types";
import mailService from "./mailService";
const schedule = require('node-schedule');

class QueueService {
	queueModel: QueueModel;

	constructor(queueModel: QueueModel) {
		this.queueModel = queueModel;
	}
	async getAllQueue(args: getAllQueryParams) {
		return this.queueModel.getAll(args);
	};
	
	async createQueueRow(queueData: queueData) {
		return this.queueModel.create({
			user_id: queueData.user_id,
			queue_date: queueData.queue_date,
			queue_time: queueData.queue_time,
			status: queueData.status
		});
	};


	async getQueueRowById(id: string) {
		return this.queueModel.getById(id);
	};

	async updateQueueRow(id: string, queueData: queueData) {
		return this.queueModel.update(id, queueData);
	};

	async deleteQueueRow(id: string) {
		return this.queueModel.delete(id);
	};

	async getQueueByDate(queueDate: string) {
		return this.queueModel.getByDate(queueDate);
	}

	async remindUserRecording() {
		const today = new Date().getTime();
		const hours = [24, 6, 2];


		const bookedQueue = await this.queueModel.getAll({
			filterFields: ['status'],
			filterValues: ['booked']
		});
		if (!Array.isArray(bookedQueue)) {
			return;
		}
		for (const row of bookedQueue) {
			if (!row.email) {
				continue;
			}
			const date = new Date(row.queue_date);
			const timeArr = row.queue_time.split(':');
			date.setHours(parseInt(timeArr[0]));
			date.setMinutes(parseInt(timeArr[1]));
			for (const hour of hours) {
				if (today + hour * 3600 * 1000 < date.getTime() && date.getTime() < today + (hour + 1) * 3600 * 1000) {
					const sendDate = new Date(date.getTime() - hour * 3600 * 1000);
					const job = schedule.scheduleJob(sendDate, () => {
						mailService.sendReminderMail(String(row.email), hour, row);
					})
					console.log('Создана задача, напомнить ', sendDate);
				}
			}
		}
	}
};

export default QueueService;

export type { QueueService };