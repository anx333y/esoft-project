import QueueController from "../controllers/queueController";
import express from "express";

export default (queueController: QueueController) => {
	const router = express.Router();

	router.route('/queue')
		.get(queueController.getAllQueue)
		.post(queueController.createQueueRow);
	router.route('/queue/:queueId')
		.get(queueController.getQueueRowById)
		.put(queueController.updateQueueRow)
		.delete(queueController.deleteQueueRow);
	router.route('/queue/bydate/:date')
		.get(queueController.getQueueByDate);

	return router;
};