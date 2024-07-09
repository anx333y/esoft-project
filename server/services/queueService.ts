import QueueModel from "../models/queueModel";
import { queueData } from "../types";

class QueueService {
	queueModel: QueueModel;

	constructor(queueModel: QueueModel) {
		this.queueModel = queueModel;
	}

	async getAllQueue(page: number, limit: number, filterField: string, filterValue: string, sortField: string, sort: string) {
		return this.queueModel.getAll(page, limit, filterField, filterValue, sortField, sort);
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
};

export default QueueService;

export type { QueueService };